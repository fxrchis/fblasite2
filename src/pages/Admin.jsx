import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';

function Admin() {
  const [items, setItems] = useState([]);
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('items');

  useEffect(() => {
    fetchItems();
    fetchClaims();
  }, []);

  function fetchItems() {
    setLoading(true);
    
    supabase
      .from('items')
      .select('*')
      .order('submitted_at', { ascending: false }).then(function(response) {
        console.log('Admin fetch response:', response);
        if (response.error) {
          console.error('Error fetching items:', response.error);
          setItems([]);
        } else {
          if (response.data) {
            console.log('Items found:', response.data.length);
            setItems(response.data);
          } else {
            console.log('No data in response');
            setItems([]);
          }
        }
        setLoading(false);
      });
  }

  function fetchClaims() {
    supabase
      .from('items')
      .select('*')
      .eq('item_type', 'Claim Request')
      .order('submitted_at', { ascending: false }).then(function(response) {
        console.log('Claims fetch response:', response);
        if (response.error) {
          console.error('Error fetching claims:', response.error);
          setClaims([]);
        } else {
          if (response.data) {
            console.log('Claims found:', response.data.length);
            setClaims(response.data);
          } else {
            console.log('No claims data in response');
            setClaims([]);
          }
        }
      });
  }

  function handleApprove(id, currentStatus) {
    var newStatus;
    if (currentStatus === 'approved') {
      newStatus = 'pending';
    } else {
      newStatus = 'approved';
    }
    
    supabase
      .from('items')
      .update({ status: newStatus })
      .eq('id', id).then(function(response) {
        if (response.error) {
          console.error('Error updating item:', response.error);
        } else {
          fetchItems(); // Refresh list
        }
      });
  }

  function handleUpdateClaimStatus(id, newStatus) {
    supabase
      .from('items')
      .update({ status: newStatus })
      .eq('id', id).then(function(response) {
        if (response.error) {
          console.error('Error updating claim:', response.error);
        } else {
          fetchClaims(); // Refresh claims list
        }
      });
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }
    
    supabase
      .from('items')
      .delete()
      .eq('id', id).then(function(response) {
        if (response.error) {
          console.error('Error deleting item:', response.error);
        } else {
          fetchItems(); // Refresh list
        }
      });
  }

  function handleDeleteClaim(id) {
    if (!window.confirm('Are you sure you want to delete this claim?')) {
      return;
    }
    
    supabase
      .from('items')
      .delete()
      .eq('id', id).then(function(response) {
        if (response.error) {
          console.error('Error deleting claim:', response.error);
        } else {
          fetchClaims(); // Refresh claims list
        }
      });
  }

  function parseClaimInfo(description) {
    // Parse claim information from the description field
    var lines = description.split('\n');
    var claimInfo = {
      name: '',
      email: '',
      phone: '',
      itemName: '',
      message: ''
    };
    
    for (var i = 0; i < lines.length; i++) {
      var line = lines[i];
      if (line.startsWith('Claim by: ')) {
        claimInfo.name = line.replace('Claim by: ', '');
      } else if (line.startsWith('Email: ')) {
        claimInfo.email = line.replace('Email: ', '');
      } else if (line.startsWith('Phone: ')) {
        claimInfo.phone = line.replace('Phone: ', '');
      } else if (line.startsWith('Message: ')) {
        claimInfo.message = line.replace('Message: ', '');
      }
    }
    
    // Extract item name from the item_name field (remove CLAIM prefix)
    if (lines[0] && lines[0].includes('(CLAIM:')) {
      var match = lines[0].match(/^(.*?)\s\(CLAIM: (.*?)\)$/);
      if (match) {
        claimInfo.itemName = match[1];
      }
    }
    
    return claimInfo;
  }

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date'
    var date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
  }

  if (loading) {
    console.log('Admin still loading, items:', items.length);
    return <div className="p-8">Loading...</div>;
  }

  console.log('Admin rendering with items:', items.length);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Link to="/" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all duration-200 font-outfit font-medium">
          Back to Home
        </Link>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={function() { setActiveTab('items'); }}
            className={'py-2 px-1 border-b-2 font-medium text-sm transition-colors ' + (
              activeTab === 'items'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            Items ({items.length})
          </button>
          <button
            onClick={function() { setActiveTab('claims'); }}
            className={'py-2 px-1 border-b-2 font-medium text-sm transition-colors ' + (
              activeTab === 'claims'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            )}
          >
            Claims ({claims.length})
          </button>
        </nav>
      </div>

      {/* Items Tab */}
      {activeTab === 'items' && (
        <div className="overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              Item Management ({items.length} total items)
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full"></div>
                <span className="text-gray-600">Pending ({items.filter(function(item) { return item.status !== 'approved'; }).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
                <span className="text-gray-600">Approved ({items.filter(function(item) { return item.status === 'approved'; }).length})</span>
              </div>
            </div>
          </div>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {items.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No items to review</td>
                </tr>
              ) : (
                items.map(function(item) {
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{item.item_name}</div>
                        <div className="text-sm text-gray-500">{item.item_desc}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className={'px-2 py-1 text-xs rounded-full font-medium ' + (
                            item.status === 'approved' ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          )}>
                            {item.status === 'approved' ? 'Approved' : 'Pending'}
                          </span>
                          {item.status !== 'approved' && (
                            <span className="text-xs text-orange-600 font-medium">
                              (Not visible to users)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        <button
                          onClick={function() { handleApprove(item.id, item.status); }}
                          className={'px-3 py-1 text-sm rounded transition-all duration-200 font-outfit transform hover:scale-105 font-medium ' + (
                            item.status === 'approved' 
                              ? 'bg-orange-100 text-orange-800 hover:bg-orange-200 hover:shadow-md' 
                              : 'bg-green-100 text-green-800 hover:bg-green-200 hover:shadow-md'
                          )}
                        >
                          {item.status === 'approved' ? 'Unapprove' : 'Approve'}
                        </button>
                        <button
                          onClick={function() { handleDelete(item.id); }}
                          className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Claims Tab */}
      {activeTab === 'claims' && (
        <div className="overflow-x-auto">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-700">
              Claim Requests ({claims.length} total)
            </h2>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full"></div>
                <span className="text-gray-600">Pending ({claims.filter(function(claim) { return claim.status === 'claim_pending'; }).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
                <span className="text-gray-600">Reviewed ({claims.filter(function(claim) { return claim.status === 'claim_reviewed'; }).length})</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
                <span className="text-gray-600">Resolved ({claims.filter(function(claim) { return claim.status === 'claim_resolved'; }).length})</span>
              </div>
            </div>
          </div>
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Claimant</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Item</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {claims.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-4 text-center text-gray-500">No claims to review</td>
                </tr>
              ) : (
                claims.map(function(claim) {
                  // Parse claim information from description
                  var claimInfo = parseClaimInfo(claim.item_desc);
                  
                  return (
                    <tr key={claim.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{claimInfo.name}</div>
                        <div className="text-sm text-gray-500">{claimInfo.email}</div>
                        {claimInfo.phone && (
                          <div className="text-sm text-gray-500">{claimInfo.phone}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{claimInfo.itemName}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 max-w-xs truncate" title={claimInfo.message}>
                          {claimInfo.message}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">
                          {formatDate(claim.submitted_at)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={'px-2 py-1 text-xs rounded-full font-medium ' + (
                          claim.status === 'claim_resolved' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                          claim.status === 'claim_reviewed' ? 'bg-green-100 text-green-800 border border-green-200' :
                          'bg-yellow-100 text-yellow-800 border border-yellow-200'
                        )}>
                          {claim.status === 'claim_resolved' ? 'Resolved' : 
                           claim.status === 'claim_reviewed' ? 'Reviewed' : 'Pending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 space-x-2">
                        {claim.status === 'claim_pending' && (
                          <button
                            onClick={function() { handleUpdateClaimStatus(claim.id, 'claim_reviewed'); }}
                            className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105 font-medium"
                          >
                            Mark Reviewed
                          </button>
                        )}
                        {claim.status === 'claim_reviewed' && (
                          <button
                            onClick={function() { handleUpdateClaimStatus(claim.id, 'claim_resolved'); }}
                            className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105 font-medium"
                          >
                            Mark Resolved
                          </button>
                        )}
                        <button
                          onClick={function() { handleDeleteClaim(claim.id); }}
                          className="px-3 py-1 text-sm bg-red-100 text-red-800 rounded hover:bg-red-200 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Admin;
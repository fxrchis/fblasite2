import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../config/supabaseClient';

function Claims() {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  function fetchClaims() {
    setLoading(true);
    
    supabase
      .from('claims')
      .select('*')
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
        setLoading(false);
      });
  }

  function handleUpdateStatus(id, newStatus) {
    supabase
      .from('claims')
      .update({ status: newStatus })
      .eq('id', id).then(function(response) {
        if (response.error) {
          console.error('Error updating claim:', response.error);
        } else {
          fetchClaims(); // Refresh list
        }
      });
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this claim?')) {
      return;
    }
    
    supabase
      .from('claims')
      .delete()
      .eq('id', id).then(function(response) {
        if (response.error) {
          console.error('Error deleting claim:', response.error);
        } else {
          fetchClaims(); // Refresh list
        }
      });
  }

  function formatDate(dateString) {
    if (!dateString) return 'Unknown date'
    var date = new Date(dateString)
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString()
  }

  if (loading) {
    console.log('Claims still loading, claims:', claims.length);
    return <div className="p-8">Loading...</div>;
  }

  console.log('Claims rendering with claims:', claims.length);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Claims Management</h1>
        <div className="flex gap-4">
          <Link to="/admin" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all duration-200 font-outfit font-medium">
            Back to Admin
          </Link>
          <Link to="/" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 px-3 py-1 rounded-lg transition-all duration-200 font-outfit font-medium">
            Back to Home
          </Link>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            Claim Requests ({claims.length} total)
          </h2>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-yellow-100 border border-yellow-300 rounded-full"></div>
              <span className="text-gray-600">Pending ({claims.filter(function(claim) { return claim.status === 'pending'; }).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-100 border border-green-300 rounded-full"></div>
              <span className="text-gray-600">Reviewed ({claims.filter(function(claim) { return claim.status === 'reviewed'; }).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded-full"></div>
              <span className="text-gray-600">Resolved ({claims.filter(function(claim) { return claim.status === 'resolved'; }).length})</span>
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
                return (
                  <tr key={claim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{claim.claimant_name}</div>
                      <div className="text-sm text-gray-500">{claim.claimant_email}</div>
                      {claim.claimant_phone && (
                        <div className="text-sm text-gray-500">{claim.claimant_phone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{claim.item_name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate" title={claim.claim_message}>
                        {claim.claim_message}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {formatDate(claim.submitted_at)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={'px-2 py-1 text-xs rounded-full font-medium ' + (
                        claim.status === 'resolved' ? 'bg-blue-100 text-blue-800 border border-blue-200' :
                        claim.status === 'reviewed' ? 'bg-green-100 text-green-800 border border-green-200' :
                        'bg-yellow-100 text-yellow-800 border border-yellow-200'
                      )}>
                        {claim.status === 'resolved' ? 'Resolved' : 
                         claim.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      {claim.status === 'pending' && (
                        <button
                          onClick={function() { handleUpdateStatus(claim.id, 'reviewed'); }}
                          className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded hover:bg-green-200 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105 font-medium"
                        >
                          Mark Reviewed
                        </button>
                      )}
                      {claim.status === 'reviewed' && (
                        <button
                          onClick={function() { handleUpdateStatus(claim.id, 'resolved'); }}
                          className="px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded hover:bg-blue-200 hover:shadow-md transition-all duration-200 font-outfit transform hover:scale-105 font-medium"
                        >
                          Mark Resolved
                        </button>
                      )}
                      <button
                        onClick={function() { handleDelete(claim.id); }}
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
    </div>
  );
}

export default Claims;

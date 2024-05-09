import React, { useEffect, useState } from 'react'
import { agent_id, api } from '../lib/libapi'

const ProfileNavbar = ({ clientID }) => {
  const [clientInfo, setClientInfo] = useState([])

  useEffect(() => {
    fetchClienPersonalInfo()
  }, [])

  const fetchClienPersonalInfo = async () => {

    try {
      const res = await api.getClientInfo(clientID, agent_id);
      setClientInfo(res.Client.find((item) => item.Client_ID === clientID))
    } catch (error) {
      console.error("Error fetching data from the API FETCH CLIENT PERSONAL INFO: ", error);
    }
  }

  return (
    <div>
      Your viewing the Financial Plan of:
      <div className="w-72 mt-2 p-4 rounded-md text-center border-2 text-base font-bold text-gray-700 uppercase">
        {clientInfo?.FirstName} {clientInfo?.LastName}
      </div>
    </div>
  )
}

export default ProfileNavbar
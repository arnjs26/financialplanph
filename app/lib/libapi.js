import axios from "axios"
import Cookies from "js-cookie";

export const API_BASE_URL = 'https://staging-api.financialplanph.com/api'
export const API_URL = 'https://staging-api.financialplanph.com'
export const agent_id = 409;
export const webUser = {
    user_id: 409,
    user_token: 'cPdWnzdMClevOga7hmb5no3A8GWZz6Zh409'
};
export const months =
    [
        { value: 'January', month: 'January' },
        { value: 'February', month: 'February' },
        { value: 'March', month: 'March' },
        { value: 'April', month: 'April' },
        { value: 'May', month: 'May' },
        { value: 'June', month: 'June' },
        { value: 'July', month: 'July' },
        { value: 'August', month: 'August' },
        { value: 'September', month: 'September' },
        { value: 'October', month: 'October' },
        { value: 'November', month: 'November' },
        { value: 'December', month: 'December' },
    ]

export const api = {
    getAgentOnSearch: async (a_ID, token, currPage, itemsPerPage, dataToSearch, selectedFNA) => {
        const response = await axios.get(
            `${API_BASE_URL}/searchAgentToDos?user_id=${a_ID}&user_token=${token}&page=${currPage}&per_page=${itemsPerPage}&dataToSearch=${dataToSearch}&selectedFNA=${selectedFNA}`
        );
        return response.data;
    },
    getAgentToDos: async (a_ID, token, currPage, itemsPerPage) => {
        const response = await axios.get(
            `${API_BASE_URL}/agentToDosForClients?user_id=${a_ID}&user_token=${token}&page=${currPage}&per_page=${itemsPerPage}`
        );
        return response.data;
    },
    getFNACompletion: async (a_ID, token, c_ID) => {
        const response = await axios.get(
            `${API_BASE_URL}/FNACompletion?user_id=${a_ID}&user_token=${token}&client_id=${c_ID}`
        );
        return response.data;
    },

    getAdminSettings: async (user_id, token) => {
        const response = await axios.get(
            `${API_BASE_URL}/getAdminSettings?user_id=${user_id}&token=${token}`
        );
        return response.data.Admin_Settings;
    },
    saveAdminSettings: async (
        user_id,
        token,
        val1,
        val2,
        val3,
        val4,
        val5,
        val6,
        val7
    ) => {
        const response = await axios.post(
            `${API_BASE_URL}/adminSettings?user_id=${user_id}&token=${token}&val1=${val1}&val2=${val2}&val3=${val3}&val4=${val4}&val5=${val5}&val6=${val6}&val7=${val7}`
        );
        return response.data;
    },
    checkToken: () => {
        const token = Cookies.get("token");
        //Check if token exist
        if (!token) {
            return 0;
        } else {
            return 1;
        }
    },
    logout: async (agentID, token) => {
        const response = await axios.post(
            `${API_BASE_URL}/logout?agent_id=${agentID}&token=${token}`
        );
        return response.data;
    },
    verifyUser: async (agentID, token) => {
        const response = await axios.get(
            `${API_BASE_URL}/verifyUser?user_id=${agentID}&user_token=${token}`
        );
        return response.data.data.user_info;
    },

    getClients: async (path, agentID, page, perPage) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/${path}?agent_id=${agentID}&page=${page}&per_page=${perPage}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching data from the API: ", error);
            throw error;
        }
    },
    getClientSearchResult: async (clientName, agentID, page, perPage) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/searchFromClients?agent_id=${agentID}&dataToSearch=${clientName}&page=${page}&per_page=${perPage}`
            );
            return response.data;
        } catch (error) {
            console.error("Error fetching data from the API: ", error);
            throw error;
        }
    },

    getAgent: async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/agents`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },

    getClientInfo: async (clientID, agentID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/individualClient?client_id=${clientID}&agent_id=${agentID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },

    getClientList: async (path, agentID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${path}?agent_id=${agentID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },

    getClientListPaginate: async (path, pageNumber, agentID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/${path}?agent_id=${agentID}&page=${pageNumber}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },

    getClientSearchResult: async (clientName, agentID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/searchFromClients?agent_id=${agentID}&dataToSearch=${clientName}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },

    getSelectedFinancialPriority: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/selectedFinancialPriorities?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getCashFlowList: async (cashFlowType, clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cashFlowList?cashFlowType=${cashFlowType}&client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getFamilyCompositionList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/familyComposition?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getCashAndDepositsList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/cashAndDeposit?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getReceivablesList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/receivables?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getMutualFundsList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/mutualFunds?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getBondsList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/bonds?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getStocksListedList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stocksInCompaniesListed?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getStocksNonListedList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/stocksInCompaniesNonListed?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getLifeHealthInsuranceAdviserList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lifeHealthInsuranceAdviser?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getLifeHealthInsuranceNotAdviserList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/lifeHealthInsuranceNotAdviser?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getFamilyHomeRealStateList: async (clientID, isHome) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/familyHomesRealEstate?client_id=${clientID}&isHome=${isHome}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getVehiclesList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/vehicles?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getPersonalAssetsList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/personalAssets?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getLiabilitiesList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/liabilities?client_id=${clientID}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getFPFNAList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/famProFNA?client_id=${clientID}&user_id=${agent_id}&user_token=${webUser.user_token}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
    getRetirementFNAList: async (clientID) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/retPlanFNA?client_id=${clientID}&user_id=${agent_id}&user_token=${webUser.user_token}`)
            return response.data
        } catch (error) {
            console.error("Error fetching data from the API: ", error)
            throw error;
        }
    },
}

"use client";
import { api } from "@/app/lib/libapi";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const fetchClient = createAsyncThunk('StateController/fetchClient', async () => {
  let agent_id = Cookies.get('id')
  const res = await api.getClientInfo(id, agent_id);
  return res.Client
})

export const StateController = createSlice({
  name: "StateController",
  initialState: {
    agent_id: null,
    token: null,
    user_fn: "...",
    user_ln: "...",
    user_img: "user.png",
    user_type: null,
    clients: null,
    clientInfo:[],
    cashflowInflow:[],
    cashflowOutflow:[],
    API_BASE_URL: "https://staging-api.financialplanph.com/api",
    API_URL: "https://staging-api.financialplanph.com",
    famProAvgInflaRate: 0,
    retFundPlanInfRate: 0,
    retFundPlanIntRate: 0,
    childEducFundInfRate: 0,
    realEstConvCurrTaxRate: 0,
    realEstCovExp: 0,
    defaultChildAge: 0,
  },
  reducers: {
    setSettings(state, action) {
      const { famProInflaRate, retInflationRate, retEstInterestRate, childEducInflaRate, estateConvCurrTaxRate, estateConvOtherExpenses, ageChildGoCollege } = action.payload;
      state.famProAvgInflaRate = famProInflaRate;
      state.retFundPlanInfRate = retInflationRate;
      state.retFundPlanIntRate = retEstInterestRate;
      state.childEducFundInfRate = childEducInflaRate;
      state.realEstConvCurrTaxRate = estateConvCurrTaxRate;
      state.realEstCovExp = estateConvOtherExpenses;
      state.defaultChildAge = ageChildGoCollege;
    },
    setData(state, action) {
      const { agent_id, token, FirstName, LastName, Profile_IMG, user_type } = action.payload;
      state.agent_id = agent_id;
      state.token = token;
      state.user_fn = FirstName;
      state.user_ln = LastName;
      state.user_img = Profile_IMG;
      state.user_type = user_type;
    },
    setClients(state, action) {
      const { clientList } = action.payload;
      state.clients = clientList;
    },
    setClientInfo(state, action) {
      const {clientInfo} = action.payload;
      state.clientInfo = clientInfo;
    }    
  },

  extraReducers(builder) {
    builder
      .addCase(fetchClient.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.clients = state.clients.concat(action.payload)
      })
  }
});

export const { setClients, setData, setSettings, setClientInfo } = StateController.actions;

export const clientInfoByID = (state, clientID) =>
  state.StateController.clients.find((client) => client.Client_ID === clientID)

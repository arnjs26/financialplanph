'use client'
import Bonds from '@/app/components/NetworthInventory/Bonds';
import CashAndDeposits from '@/app/components/NetworthInventory/CashAndDeposits';
import FamilyHome from '@/app/components/NetworthInventory/FamilyHome';
import FamilyLifeAndHealthInsurance from '@/app/components/NetworthInventory/FamilyLifeAndHealthInsurance';
import FamilyLifeAndHealthInsuranceAetos from '@/app/components/NetworthInventory/FamilyLifeAndHealthInsuranceAetos';
import Liabilities from '@/app/components/NetworthInventory/Liabilities';
import MutualFunds from '@/app/components/NetworthInventory/MutualFunds';
import PersonalAssets from '@/app/components/NetworthInventory/PersonalAssets';
import RealState from '@/app/components/NetworthInventory/RealState';
import Receivables from '@/app/components/NetworthInventory/Receivables';
import StocksInListedCompany from '@/app/components/NetworthInventory/StocksInListedCompany';
import StocksInNonListedCompany from '@/app/components/NetworthInventory/StocksInNonListedCompany';
import TotalAssets from '@/app/components/NetworthInventory/TotalAssets';
import TotalNetworth from '@/app/components/NetworthInventory/TotalNetworth';
import Vehicle from '@/app/components/NetworthInventory/Vehicle';
import { API_BASE_URL, api, webUser } from '@/app/lib/libapi';
import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import { IoIosInformationCircle } from "react-icons/io";

const NetworthInventoryPage = ({ params }) => {
    const { clientID } = params
    const [familyCompositionList, setFamilyCompositionList] = useState([])
    const [cashAndDepositsList, setCashAndDepositsList] = useState([{
        cad_id: 0,
        bank: '',
        account_description: '',
        type_of_account: '',
        estimated_value: 0,
        purpose: 0,
        with_guaranteed_payout: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 2,
            indicated_percent: 0,
        }]
    }])
    const [receivablesList, setReceivablesList] = useState([{
        receivables_id: 0,
        name_of_debtor: '',
        loan_purpose: '',
        estimated_value: 0,
        percentage_collectibility: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        with_cli: 0,
        renewal_month: '',
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 1,
            indicated_percent: 0,
        }]
    }])
    const [mutualFundsList, setMutualFundsList] = useState([{
        mfuitf_id: 0,
        company: '',
        no_of_units: 0,
        current_value: 0,
        estimated_value: 0,
        purpose: 0,
        with_guaranteed_payout: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 3,
            indicated_percent: 0,
        }]
    }])
    const [bondsList, setBondsList] = useState([{
        bond_id: 0,
        bonds_issuer: '',
        maturity_date: '',
        par_value: 0,
        estimated_value: 0,
        purpose: 0,
        with_guaranteed_payout: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 4,
            indicated_percent: 0,
        }]
    }])
    const [stocksInListedList, setStocksInListedList] = useState([{
        sic_id: 0,
        company_alias: '',
        no_of_shares: 0,
        current_book_value: 0,
        estimated_value: 0,
        purpose: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 5,
            indicated_percent: 0,
        }]
    }])
    const [stocksNonListedList, setStocksNonListedList] = useState([{
        sic_id: 0,
        company_alias: '',
        no_of_shares: 0,
        current_book_value: 0,
        estimated_value: 0,
        purpose: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 5,
            indicated_percent: 0,
        }]
    }])
    const [familyInsuranceAdviserList, setFamilyInsuranceAdviserList] = useState([{
        flahi_id: 0,
        insurance_company: '',
        policy_owner: 0,
        policy_number: '',
        type_of_policy: 0,
        month_year_issued: '',
        insured: 0,
        purpose: '',
        with_guaranteed_payout: 0,
        faceamount_fpcf: 0,
        faceamount_etax: 0,
        faceamount_edistribution: 0,
        faceamount_total: 0,
        current_account_value: 0,
        beneficiaries: [{
            beneficiaries_id: 0,
            full_name: '',
            percent_share: 0,
            designation: 0,
            priority: 0,
        }]
    }])
    const [familyInsuranceNotAdviserList, setFamilyInsuranceNotAdviserList] = useState([{
        flahi_id: 0,
        insurance_company: '',
        policy_owner: 0,
        policy_number: '',
        type_of_policy: 0,
        month_year_issued: '',
        insured: 0,
        purpose: '',
        with_guaranteed_payout: 0,
        faceamount_fpcf: 0,
        faceamount_etax: 0,
        faceamount_edistribution: 0,
        faceamount_total: 0,
        current_account_value: 0,
        beneficiaries: [{
            beneficiaries_id: 0,
            full_name: '',
            percent_share: 0,
            designation: 0,
            priority: 0,
        }]
    }])
    const [familyHomeList, setFamilyHomeList] = useState([{
        fh_id: 0,
        tct_cct_number: '',
        location: '',
        area_sqm: '',
        bir_zonal_value: 0,
        estimated_value: 0,
        exclusive_conjugal: 0,
        purpose: 0,
        with_guaranteed_payout: 1,
        share_self: 0,
        share_spouse: 0,
        with_property_insurance: 1,
        renewalMonth: '',
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 6,
            indicated_percent: 0,
        }]
    }])
    const [realStateList, setRealStateList] = useState([{
        fh_id: 0,
        tct_cct_number: '',
        location: '',
        area_sqm: '',
        bir_zonal_value: 0,
        estimated_value: 0,
        exclusive_conjugal: 0,
        purpose: 0,
        with_guaranteed_payout: 1,
        share_self: 0,
        share_spouse: 0,
        with_property_insurance: 1,
        renewalMonth: '',
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 6,
            indicated_percent: 0,
        }]
    }])
    const [vehiclesList, setVehiclesList] = useState([{
        vehicles_id: 0,
        plate_no: '',
        vehicle_type: '',
        estimated_value: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        with_vehicle_insurance: 1,
        renewalMonth: '',
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 7,
            indicated_percent: 0,
        }]
    }])
    const [personalAssetsList, setPersonalAssetsList] = useState([{
        pa_id: 0,
        item_name: '',
        estimated_value: 0,
        purpose: '',
        with_guaranteed_payout: 0,
        exclusive_conjugal: 0,
        share_self: 0,
        share_spouse: 0,
        heirs: [{
            heir_id: 0,
            famComp_id: 0,
            table_ID: 0,
            from_table: 8,
            indicated_percent: 0,
        }]
    }])
    const [liabilitiesList, setLiabilitiesList] = useState([{
        liabilities_id: 0,
        name_of_creditor: '',
        type_of_liability: 0,
        total_unpaid_amount: 0,
        annual_interest_rate: 0,
        amount_of_mri: 0,
        renewal_month: '',
        spouse_participation: 0,
        property_association: 0,
    }])
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const [showCLIMonth, setShowCLIMonth] = useState(false)
    const [showRenewalMonth, setShowRenewalMonth] = useState(false)
    const [showFamilyHomeRenewalMonth, setShowFamilyHomeRenewalMonth] = useState(false)
    const [showRealStateRenewalMonth, setShowRealStateRenewalMonth] = useState(false)
    const [isEditing, setIsEditing] = useState({
        cashAndDeposit: false,
        receivables: false,
        mutualFunds: false,
        bonds: false,
        stocksInListed: false,
        stocksNonListed: false,
        familyInsuranceAdviser: false,
        familyInsuranceNonAdviser: false,
        familyHome: false,
        realState: false,
        vehicles: false,
        personalAssets: false,
        liabilities: false,
    })

    useEffect(() => {
        fetchData()
        // fetchFamilyCompositionList()
        // fetchCashAndDepositsList()
        // fetchReceivablesList()
        // fetchMutualFundsList()
        // fetchBondsList()
        // fetchStocksInListedList()
        // fetchStocksNonListedList()
        // fetchLifeHealthInsuranceAdviserList()
        // fetchLifeHealthInsuranceNotAdviserList()
        // fetchFamiylHomeList()
        // fetchRealStateList()
        // fetchVehiclesList()
        // fetchPersonalAssetsList()
        // fetchLiabilitiesList()
    }, [])

    const fetchData = async() => {
        const famComp = await api.getFamilyCompositionList(clientID);
        const cashAndDeposits = await api.getCashAndDepositsList(clientID);
        const receivables = await api.getReceivablesList(clientID);
        const mutualFunds = await api.getMutualFundsList(clientID);
        const bonds = await api.getBondsList(clientID);
        const stocksInListed = await api.getStocksListedList(clientID);
        const stocksNonListed = await api.getStocksNonListedList(clientID);
        const healthInsuranceAdviser = await api.getLifeHealthInsuranceAdviserList(clientID);
        const healthInsuranceNotAdviser = await api.getLifeHealthInsuranceNotAdviserList(clientID);
        const familyHome = await api.getFamilyHomeRealStateList(clientID, 1);
        const realState = await api.getFamilyHomeRealStateList(clientID, 2);
        const vehicle = await api.getVehiclesList(clientID);
        const personalAssets = await api.getPersonalAssetsList(clientID);
        const liabilities = await api.getLiabilitiesList(clientID);        

        Promise.all(
            [
                famComp, 
                cashAndDeposits, 
                receivables, 
                mutualFunds, 
                bonds, 
                stocksInListed, 
                stocksNonListed,
                healthInsuranceAdviser,
                healthInsuranceNotAdviser,
                familyHome,
                realState,
                vehicle,
                personalAssets,
                liabilities
            ]
        ).then(
            axios.spread((...allData)=>{
                console.log('alldata', allData)
            })
        )
    }
    
    const fetchFamilyCompositionList = async () => {
        try {
            const res = await api.getFamilyCompositionList(clientID);
            setFamilyCompositionList(res?.Family_Composition)
        } catch (error) {
            console.error("Error fetching data from the API FETCH FAMILY COMPOSITION LIST: ", error);
        }
    }

    const fetchCashAndDepositsList = async () => {
        try {
            const res = await api.getCashAndDepositsList(clientID);
            setCashAndDepositsList(res?.Cash_And_Deposits)
        } catch (error) {
            console.error("Error fetching data from the API FETCH CASH AND DEPOSITS LIST: ", error);
        }
    }

    const fetchReceivablesList = async () => {
        try {
            const res = await api.getReceivablesList(clientID);
            setReceivablesList(res?.Receivables)
        } catch (error) {
            console.error("Error fetching data from the API FETCH RECEIVABLES LIST: ", error);
        }
    }

    const fetchMutualFundsList = async () => {
        try {
            const res = await api.getMutualFundsList(clientID);
            setMutualFundsList(res?.Mutual_Funds)
        } catch (error) {
            console.error("Error fetching data from the API FETCH MUTUAL FUNDS LIST: ", error);
        }
    }

    const fetchBondsList = async () => {
        try {
            const res = await api.getBondsList(clientID);
            setBondsList(res?.Bonds)
        } catch (error) {
            console.error("Error fetching data from the API FETCH BONDS LIST: ", error);
        }
    }

    const fetchStocksInListedList = async () => {
        try {
            const res = await api.getStocksListedList(clientID);
            setStocksInListedList(res?.Bonds)
        } catch (error) {
            console.error("Error fetching data from the API FETCH STOCKS IN LISTED LIST: ", error);
        }
    }

    const fetchStocksNonListedList = async () => {
        try {
            const res = await api.getStocksNonListedList(clientID);
            setStocksNonListedList(res?.Bonds)
        } catch (error) {
            console.error("Error fetching data from the API FETCH STOCKS IN NON LISTED LIST: ", error);
        }
    }

    const fetchLifeHealthInsuranceAdviserList = async () => {
        try {
            const res = await api.getLifeHealthInsuranceAdviserList(clientID);
            setFamilyInsuranceAdviserList(res?.Life_And_Health_Insurance)
        } catch (error) {
            console.error("Error fetching data from the API LIFE AND HEALTH INSURANCE ADVISERS LIST: ", error);
        }
    }

    const fetchLifeHealthInsuranceNotAdviserList = async () => {
        try {
            const res = await api.getLifeHealthInsuranceNotAdviserList(clientID);
            setFamilyInsuranceNotAdviserList(res?.Life_And_Health_Insurance)
        } catch (error) {
            console.error("Error fetching data from the API LIFE AND HEALTH INSURANCE NOT ADVISERS LIST: ", error);
        }
    }

    const fetchFamiylHomeList = async () => {
        try {
            const res = await api.getFamilyHomeRealStateList(clientID, 1);
            setFamilyHomeList(res?.Family_Homes)
        } catch (error) {
            console.error("Error fetching data from the API FAMILY HOMES LIST: ", error);
        }
    }

    const fetchRealStateList = async () => {
        try {
            const res = await api.getFamilyHomeRealStateList(clientID, 2);
            setRealStateList(res?.Real_Estate)
        } catch (error) {
            console.error("Error fetching data from the API FAMILY HOMES LIST: ", error);
        }
    }

    const fetchVehiclesList = async () => {
        try {
            const res = await api.getVehiclesList(clientID);
            setVehiclesList(res?.Vehicles)
        } catch (error) {
            console.error("Error fetching data from the API VEHICLES LIST: ", error);
        }
    }

    const fetchPersonalAssetsList = async () => {
        try {
            const res = await api.getPersonalAssetsList(clientID);
            setPersonalAssetsList(res?.Personal_Assets)
        } catch (error) {
            console.error("Error fetching data from the API PERSONAL ASSETS LIST: ", error);
        }
    }

    const fetchLiabilitiesList = async () => {
        try {
            const res = await api.getLiabilitiesList(clientID);
            setLiabilitiesList(res?.Liabilities)
        } catch (error) {
            console.error("Error fetching data from the API FETCH LIABILITIES LIST: ", error);
        }
    }

    const handleInputChange = (event, index, networthType, heirIndex) => {

        //Liabilities
        if (networthType === 'liabilities') {
            let liabilitiesData = [...liabilitiesList];
            liabilitiesData[index][event.target.name] = event.target.value;
            setLiabilitiesList(liabilitiesData);
            setIsEditing({ ...isEditing, liabilities: true })
        }

        //Cash and Receivables
        if (networthType === 'heirs') {
            let heirsData = [...cashAndDepositsList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setCashAndDepositsList(heirsData);
        }

        if (networthType === 'cad') {
            let CashAndDepositsData = [...cashAndDepositsList];
            CashAndDepositsData[index][event.target.name] = event.target.value;
            setCashAndDepositsList(CashAndDepositsData);
            setIsEditing({ ...isEditing, cashAndDeposit: true })
        }

        //Receivables
        if (networthType === 'heirsReceivables') {
            let heirsData = [...receivablesList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setReceivablesList(heirsData);
        }

        if (networthType === 'receivables') {
            if (event.target.value === '0') {
                setShowCLIMonth(true)
            }
            if (event.target.value === '1') {
                setShowCLIMonth(false)
            }

            let ReceivablesData = [...receivablesList];
            ReceivablesData[index][event.target.name] = event.target.value;
            setReceivablesList(ReceivablesData);
            setIsEditing({ ...isEditing, receivables: true })

        }

        //Mutual Funds
        if (networthType === 'heirsMutualFunds') {
            let heirsData = [...mutualFundsList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setMutualFundsList(heirsData);
        }
        if (networthType === 'mutualFunds') {
            let mutualFundsData = [...mutualFundsList];
            mutualFundsData[index][event.target.name] = event.target.value;
            setMutualFundsList(mutualFundsData);
            setIsEditing({ ...isEditing, mutualFunds: true })
        }

        //Bonds
        if (networthType === 'heirsBonds') {
            let heirsData = [...bondsList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setBondsList(heirsData);
        }
        if (networthType === 'bonds') {
            let bondsData = [...bondsList];
            bondsData[index][event.target.name] = event.target.value;
            setBondsList(bondsData);
            setIsEditing({ ...isEditing, bonds: true })

        }

        //Stocks in Listed
        if (networthType === 'heirsStocksInListed') {
            let heirsData = [...stocksInListedList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setStocksInListedList(heirsData);
        }
        if (networthType === 'stocksInListed') {
            let stocksInListedData = [...stocksInListedList];
            stocksInListedData[index][event.target.name] = event.target.value;
            setStocksInListedList(stocksInListedData);
            setIsEditing({ ...isEditing, stocksInListed: true })
        }

        //Stocks in Non Listed
        if (networthType === 'heirsStocksNonListed') {
            let heirsData = [...stocksNonListedList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setStocksNonListedList(heirsData);
        }
        if (networthType === 'stocksNonListed') {
            let stocksNonListedData = [...stocksNonListedList];
            stocksNonListedData[index][event.target.name] = event.target.value;
            setStocksNonListedList(stocksNonListedData);
            setIsEditing({ ...isEditing, stocksNonListed: true })
        }

        //Family Homes
        if (networthType === 'heirsFamilyHome') {
            let heirsData = [...familyHomeList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setFamilyHomeList(heirsData);
        }
        if (networthType === 'familyHome') {
            if (event.target.value === '0') {
                setShowFamilyHomeRenewalMonth(true)
            }
            if (event.target.value === '1') {
                setShowFamilyHomeRenewalMonth(false)
            }

            let famiylHomeData = [...familyHomeList];
            famiylHomeData[index][event.target.name] = event.target.value;
            setFamilyHomeList(famiylHomeData);
            setIsEditing({ ...isEditing, familyHome: true })
        }

        //Real State
        if (networthType === 'heirsRealState') {
            let heirsData = [...realStateList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setRealStateList(heirsData);
        }
        if (networthType === 'realState') {
            if (event.target.value === '0') {
                setShowRealStateRenewalMonth(true)
            }
            if (event.target.value === '1') {
                setShowRealStateRenewalMonth(false)
            }

            let realStateData = [...realStateList];
            realStateData[index][event.target.name] = event.target.value;
            setRealStateList(realStateData);
            setIsEditing({ ...isEditing, realState: true })

        }

        //Vehicles
        if (networthType === 'heirsVehicles') {
            let heirsData = [...vehiclesList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setVehiclesList(heirsData);
        }
        if (networthType === 'vehicles') {
            if (event.target.value === '0') {
                setShowRenewalMonth(true)
            }
            if (event.target.value === '1') {
                setShowRenewalMonth(false)
            }

            let vehiclesData = [...vehiclesList];
            vehiclesData[index][event.target.name] = event.target.value;
            setVehiclesList(vehiclesData);
            setIsEditing({ ...isEditing, vehicles: true })
        }

        //Personal Assets
        if (networthType === 'heirsPersonalAssets') {
            let heirsData = [...personalAssetsList];
            heirsData[index].heirs[heirIndex][event.target.name] = event.target.value;
            setPersonalAssetsList(heirsData);
        }
        if (networthType === 'personalAssets') {
            let personalAssetsData = [...personalAssetsList];
            personalAssetsData[index][event.target.name] = event.target.value;
            setPersonalAssetsList(personalAssetsData);
            setIsEditing({ ...isEditing, personalAssets: true })

        }
    }


    const handleAddInputForm = (networthType, index) => {

        //Liabilities
        if (networthType === 'liabilities') {
            const newLiabilitiesItem = {
                liabilities_id: 0,
                name_of_creditor: '',
                type_of_liability: 0,
                total_unpaid_amount: 0,
                annual_interest_rate: 0,
                amount_of_mri: 0,
                renewal_month: '',
                spouse_participation: 0,
                property_association: 0,
            }
            setLiabilitiesList([...liabilitiesList, newLiabilitiesItem])
        }

        //Cash and Deposits
        if (networthType === 'heirs') {
            const updatedCashAndDepositsList = [...cashAndDepositsList];
            updatedCashAndDepositsList[index].heirs.push({
                part: index,
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 2,
                indicated_percent: 0,
            });
            setCashAndDepositsList(updatedCashAndDepositsList);
        }

        if (networthType === 'cad') {
            const newCAD = {
                cad_id: 0,
                bank: '',
                account_description: '',
                type_of_account: '',
                estimated_value: 0,
                purpose: 0,
                with_guaranteed_payout: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                heirs: [{
                    part: index,
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 2,
                    indicated_percent: 0,
                }]
            }
            setCashAndDepositsList([...cashAndDepositsList, newCAD])
        }

        //Receivables
        if (networthType === 'receivables') {
            const newCAD = {
                receivables_id: 0,
                name_of_debtor: '',
                loan_purpose: '',
                estimated_value: 0,
                percentage_collectibility: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                with_cli: 0,
                renewal_month: '',
                heirs: [{
                    part: index,
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 1,
                    indicated_percent: 0,
                }]
            }
            setReceivablesList([...receivablesList, newCAD])
        }

        if (networthType === 'heirsReceivables') {
            const updatedReceivableList = [...receivablesList];
            updatedReceivableList[index].heirs.push({
                part: index,
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 1,
                indicated_percent: 0,
            });
            setReceivablesList(updatedReceivableList);
        }

        //Mutual Funds
        if (networthType === 'mutualFunds') {
            const newMutualFunds = {
                mfuitf_id: 0,
                company: '',
                no_of_units: 0,
                current_value: 0,
                estimated_value: 0,
                purpose: 0,
                with_guaranteed_payout: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 3,
                    indicated_percent: 0,
                }]
            }
            setMutualFundsList([...mutualFundsList, newMutualFunds])
        }

        if (networthType === 'heirsMutualFunds') {
            const updatedMutualFundsList = [...mutualFundsList];
            updatedMutualFundsList[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 3,
                indicated_percent: 0,
            });
            setMutualFundsList(updatedMutualFundsList);
        }

        //Bonds
        if (networthType === 'bonds') {
            const newBonds = {
                bond_id: 0,
                bonds_issuer: '',
                maturity_date: '',
                par_value: 0,
                estimated_value: 0,
                purpose: 0,
                with_guaranteed_payout: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 4,
                    indicated_percent: 0,
                }]
            }
            setBondsList([...bondsList, newBonds])
        }

        if (networthType === 'heirsBonds') {
            const updatedBondsList = [...bondsList];
            updatedBondsList[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 4,
                indicated_percent: 0,
            });
            setBondsList(updatedBondsList);
        }

        //Stocks in Listed
        if (networthType === 'stocksInListed') {
            const newStocksInListed = {
                sic_id: 0,
                company_alias: '',
                no_of_shares: 0,
                current_book_value: 0,
                estimated_value: 0,
                purpose: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 5,
                    indicated_percent: 0,
                }]
            }
            setStocksInListedList([...stocksInListedList, newStocksInListed])
        }

        if (networthType === 'heirsStocksInListed') {
            const updatedStocksInListedList = [...stocksInListedList];
            updatedStocksInListedList[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 4,
                indicated_percent: 0,
            });
            setStocksInListedList(updatedStocksInListedList);
        }

        //Stocks Non Listed
        if (networthType === 'stocksNonListed') {
            const newStocksNonListed = {
                sic_id: 0,
                company_alias: '',
                no_of_shares: 0,
                current_book_value: 0,
                estimated_value: 0,
                purpose: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 5,
                    indicated_percent: 0,
                }]
            }
            setStocksNonListedList([...stocksNonListedList, newStocksNonListed])
        }

        if (networthType === 'heirsStocksNonListed') {
            const updatedStocksNonListedList = [...stocksNonListedList];
            updatedStocksNonListedList[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 4,
                indicated_percent: 0,
            });
            setStocksNonListedList(updatedStocksNonListedList);
        }

        //Family Homes
        if (networthType === 'familyHome') {
            const newFamilyHome = {
                fh_id: 0,
                tct_cct_number: '',
                location: '',
                area_sqm: '',
                bir_zonal_value: 0,
                estimated_value: 0,
                exclusive_conjugal: 0,
                purpose: 0,
                with_guaranteed_payout: 1,
                share_self: 0,
                share_spouse: 0,
                with_property_insurance: 1,
                renewalMonth: '',
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 6,
                    indicated_percent: 0,
                }]
            }
            setFamilyHomeList([...familyHomeList, newFamilyHome])
        }

        if (networthType === 'heirsFamilyHome') {
            const updatedFamilyHome = [...familyHomeList];
            updatedFamilyHome[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 6,
                indicated_percent: 0,
            });
            setFamilyHomeList(updatedFamilyHome);
        }

        //Real State
        if (networthType === 'realState') {
            const newRealState = {
                fh_id: 0,
                tct_cct_number: '',
                location: '',
                area_sqm: '',
                bir_zonal_value: 0,
                estimated_value: 0,
                exclusive_conjugal: 0,
                purpose: 0,
                with_guaranteed_payout: 1,
                share_self: 0,
                share_spouse: 0,
                with_property_insurance: 1,
                renewalMonth: '',
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 6,
                    indicated_percent: 0,
                }]
            }
            setRealStateList([...realStateList, newRealState])
        }

        if (networthType === 'heirsRealState') {
            const updatedRealState = [...realStateList];
            updatedRealState[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 6,
                indicated_percent: 0,
            });
            setRealStateList(updatedRealState);
        }

        //Vehicles
        if (networthType === 'vehicles') {
            const newVehicles = {
                vehicles_id: 0,
                plate_no: '',
                vehicle_type: '',
                estimated_value: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                with_vehicle_insurance: 1,
                renewalMonth: '',
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 7,
                    indicated_percent: 0,
                }]
            }
            setVehiclesList([...vehiclesList, newVehicles])
        }

        if (networthType === 'heirsVehicles') {
            const updatedVehicles = [...vehiclesList];
            updatedVehicles[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 7,
                indicated_percent: 0,
            });
            setVehiclesList(updatedVehicles);
        }

        //Personal Assets
        if (networthType === 'personalAssets') {
            const newPersonalAssets = {
                pa_id: 0,
                item_name: '',
                estimated_value: 0,
                purpose: '',
                with_guaranteed_payout: 0,
                exclusive_conjugal: 0,
                share_self: 0,
                share_spouse: 0,
                heirs: [{
                    heir_id: 0,
                    famComp_id: 0,
                    table_ID: 0,
                    from_table: 8,
                    indicated_percent: 0,
                }]
            }
            setPersonalAssetsList([...personalAssetsList, newPersonalAssets])
        }

        if (networthType === 'heirsPersonalAssets') {
            const updatedPersonalAssets = [...personalAssetsList];
            updatedPersonalAssets[index].heirs.push({
                heir_id: 0,
                famComp_id: 0,
                table_ID: 0,
                from_table: 8,
                indicated_percent: 0,
            });
            setPersonalAssetsList(updatedPersonalAssets);
        }
    }

    const removeOtherInputFields = (index, networthType) => {

        if (networthType === 'liabilities') {
            let liabilitiesData = [...liabilitiesList];
            liabilitiesData.splice(index, 1)
            setLiabilitiesList(liabilitiesData)
        }

        if (networthType === 'cad') {
            let CashAndDepositsData = [...cashAndDepositsList];
            CashAndDepositsData.splice(index, 1)
            setCashAndDepositsList(CashAndDepositsData)
        }
    }

    const setHeirsData = (data) => {
        let allHeirs = [];

        // Iterate over each bond object in the  array
        data.forEach((item, idx) => {
            // Extract the 'heirs' array from each item object
            const heirs = item.heirs;
            // Iterate over each heir in the 'heirs' array
            heirs.forEach(heir => {
                // Add 'part' property to each heir indicating the index (idx) from the original 
                heir.part = idx;
                // Push the modified heir to the 'allHeirs' array
                allHeirs.push(heir);
            });
        });

        return allHeirs
    }

    const handleSubmitForms = async () => {

        //Liabilities
        let liabilitiesData =
            [
                {
                    "data":
                        liabilitiesList.map((item, idx) => (
                            [
                                { "liabilities_id": item.liabilities_id },
                                { "client_id": clientID },
                                { "name_of_creditor": item.name_of_creditor },
                                { "type_of_liability": item.type_of_liability },
                                { "total_unpaid_amount": item.total_unpaid_amount },
                                { "annual_interest_rate": item.annual_interest_rate },
                                { "amount_of_mri": item.amount_of_mri },
                                { "renewal_month": item.renewal_month ?? '' },
                                { "spouse_participation": item["spouse_participation" + idx] },
                                { "property_association": item.property_association }
                            ]
                        ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (liabilitiesList.length !== 0) {
            const resLiabilities = await axios.post(`${API_BASE_URL}/newLiabilities`, liabilitiesData);
            if (resLiabilities.status === 200) {
                setLiabilitiesList(resLiabilities.data.Liabilities)
                alert('Liabilities Successfull')
            }
        }

        // Cash and Deposits
        let cadSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        cashAndDepositsList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "cad_id": item.cad_id },
                                { "client_id": clientID },
                                { "bank": item.bank },
                                { "account_description": item.account_description },
                                { "type_of_account": item.type_of_account },
                                { "estimated_value": item.estimated_value },
                                { "purpose": item.purpose },
                                { "with_guaranteed_payout": item.with_guaranteed_payout },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(cashAndDepositsList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]
        if (cashAndDepositsList.length !== 0) {
            if (isEditing.cashAndDeposit) {
                const res = await axios.post(`${API_BASE_URL}/newCashAndDeposit`, cadSubmitData);
                alert('Cash and Deposit Successfull')
            }
        }

        //Receivables
        let receivablesSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        receivablesList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "receivables_id": item.receivables_id },
                                { "client_id": clientID },
                                { "name_of_debtor": item.name_of_debtor },
                                { "loan_purpose": item.loan_purpose },
                                { "estimated_value": item.estimated_value },
                                { "percentage_collectibility": item.percentage_collectibility },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse },
                                { "with_cli": item.with_cli },
                                { "renewal_month": item.renewal_month }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(receivablesList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (receivablesList.length !== 0) {
            if (isEditing.receivables) {
                const res = await axios.post(`${API_BASE_URL}/newReceivables`, receivablesSubmitData);
                alert('Receivables Successfull')
            }
        }

        // Mutual Funds
        let mutualFundsSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        mutualFundsList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "mfuitf_id": item.mfuitf_id },
                                { "client_id": clientID },
                                { "company": item.company },
                                { "no_of_units": item.no_of_units },
                                { "current_value": item.current_value },
                                { "estimated_value": item.estimated_value },
                                { "purpose": item.purpose },
                                { "with_guaranteed_payout": item.with_guaranteed_payout },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(mutualFundsList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (mutualFundsList.length !== 0) {
            if (isEditing.mutualFunds) {
                const res = await axios.post(`${API_BASE_URL}/newMutualFunds`, mutualFundsSubmitData);
                alert('Mutual Funds Successfull')
            }
        }

        //Bonds
        let bondsSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        bondsList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "bond_id": item.bond_id },
                                { "client_id": clientID },
                                { "bonds_issuer": item.bonds_issuer },
                                { "maturity_date": item.maturity_date },
                                { "par_value": item.par_value },
                                { "estimated_value": item.estimated_value },
                                { "purpose": item.purpose },
                                { "with_guaranteed_payout": item.with_guaranteed_payout },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(bondsList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (bondsList.length !== 0) {
            if (isEditing.bonds) {
                const res = await axios.post(`${API_BASE_URL}/newBonds`, bondsSubmitData);
                alert('Bonds Successfull')
            }
        }

        //Stocks in Listed Company
        let stocksInListedSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        stocksInListedList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "sic_id": item.sic_id },
                                { "client_id": clientID },
                                { "company_alias": item.company_alias },
                                { "no_of_shares": item.no_of_shares },
                                { "current_book_value": item.current_book_value },
                                { "estimated_value": item.estimated_value },
                                { "purpose": item.purpose },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(stocksInListedList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (stocksInListedList.length !== 0) {
            if (isEditing.stocksInListed) {
                const res = await axios.post(`${API_BASE_URL}/newStockInCompaniesListed`, stocksInListedSubmitData);
                alert('Stocks In Listed Company Successfull')
            }
        }

        //Stocks Non Listed Company
        let stocksNonListedSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        stocksNonListedList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "sic_id": item.sic_id },
                                { "client_id": clientID },
                                { "company_alias": item.company_alias },
                                { "no_of_shares": item.no_of_shares },
                                { "current_book_value": item.current_book_value },
                                { "estimated_value": item.estimated_value },
                                { "purpose": item.purpose },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(stocksNonListedList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (stocksNonListedList.length !== 0) {
            if (isEditing.stocksNonListed) {
                const res = await axios.post(`${API_BASE_URL}/newStockInCompaniesNonListed`, stocksNonListedSubmitData);
                alert('Stocks In Listed Company Successfull')
            }
        }

        //Family Home
        let familyHomeSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        familyHomeList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "fh_id": item.fh_id },
                                { "client_id": clientID },
                                { "tct_cct_number": item.tct_cct_number },
                                { "location": item.location },
                                { "area_sqm": item.area_sqm },
                                { "bir_zonal_value": item.bir_zonal_value },
                                { "estimated_value": item.estimated_value },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "purpose": item.purpose },
                                { "with_guaranteed_payout": item.with_guaranteed_payout },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse },
                                { "with_property_insurance": item.with_property_insurance },
                                { "renewalMonth": item.renewalMonth }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(familyHomeList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (familyHomeList.length !== 0) {
            if (isEditing.familyHome) {
                const res = await axios.post(`${API_BASE_URL}/newFamilyHome`, familyHomeSubmitData);
                alert('Family Home Successfull')
            }
        }

        //Real State
        let realStateSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        realStateList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "fh_id": item.fh_id },
                                { "client_id": clientID },
                                { "tct_cct_number": item.tct_cct_number },
                                { "location": item.location },
                                { "area_sqm": item.area_sqm },
                                { "bir_zonal_value": item.bir_zonal_value },
                                { "estimated_value": item.estimated_value },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "purpose": item.purpose },
                                { "with_guaranteed_payout": item.with_guaranteed_payout },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse },
                                { "with_property_insurance": item.with_property_insurance },
                                { "renewalMonth": item.renewalMonth }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(realStateList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (realStateList.length !== 0) {
            if (isEditing.realState) {
                const res = await axios.post(`${API_BASE_URL}/newRealEstate`, realStateSubmitData);
                alert('Real State Successfull')
            }
        }

        //Vehicles
        let vehiclesSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        vehiclesList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "vehicles_id": item.vehicles_id },
                                { "client_id": clientID },
                                { "plate_no": item.plate_no },
                                { "vehicle_type": item.vehicle_type },
                                { "estimated_value": item.estimated_value },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse },
                                { "with_vehicle_insurance": item.with_vehicle_insurance },
                                { "renewalMonth": item.renewalMonth }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(vehiclesList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (vehiclesList.length !== 0) {
            if (isEditing.vehicles) {
                const res = await axios.post(`${API_BASE_URL}/newVehicles`, vehiclesSubmitData);
                alert('Vehicles Successfull')
            }
        }

        //Personal Assets
        let personalAssetsSubmitData =
            [
                {
                    // Check if inputData is empty it means no value is being inputted
                    "data":
                        personalAssetsList.map((item, idx) => (
                            [
                                { "part": idx },
                                { "pa_id": item.pa_id },
                                { "client_id": clientID },
                                { "item_name": item.item_name },
                                { "estimated_value": item.estimated_value },
                                { "purpose": item.purpose },
                                { "with_guaranteed_payout": item.with_guaranteed_payout },
                                { "exclusive_conjugal": item.exclusive_conjugal },
                                { "share_self": item.share_self },
                                { "share_spouse": item.share_spouse }
                            ]
                        ))
                },
                {
                    "heirs": setHeirsData(personalAssetsList).map(heir => (
                        [
                            { "part": heir.part },
                            { "heir_id": heir.heir_id },
                            { "famComp_id": heir.famComp_id },
                            { "table_ID": heir.table_ID },
                            { "from_table": heir.from_table },
                            { "indicated_percent": heir.indicated_percent }
                        ]
                    ))
                },
                { "client_id": clientID },
                {
                    "web_user":
                        [
                            [
                                { "user_id": webUser.user_id },
                                { "user_token": webUser.user_token }
                            ]
                        ]
                }
            ]

        if (personalAssetsList.length !== 0) {
            if (isEditing.personalAssets) {
                const res = await axios.post(`${API_BASE_URL}/newPersonalAssets`, personalAssetsSubmitData);
                alert('Personal Assets Successfull')
            }
        }
    }

    const totalEstimatedValue = cashAndDepositsList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalReceivablesEstimatedValue = receivablesList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalMutualFundsEstimatedValue = mutualFundsList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalBondsEstimatedValue = bondsList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalStocksInListedEstimatedValue = stocksInListedList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalStocksNonListedEstimatedValue = stocksNonListedList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalFamilyInsuranceCurrentAccountValue = familyInsuranceAdviserList.reduce((sum, value) => {
        const currentAccountValue = value.current_account_value || 0;
        return sum + currentAccountValue;
    }, 0);

    const totalFamilyInsuranceNotAdviserCurrentAccountValue = familyInsuranceNotAdviserList.reduce((sum, value) => {
        const currentAccountValue = value.current_account_value || 0;
        return sum + currentAccountValue;
    }, 0);

    const totalVehiclesEstimatedValue = vehiclesList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalPersonalAssetsEstimatedValue = personalAssetsList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalFamilyHomeEstimatedValue = familyHomeList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    const totalRealStateEstimatedValue = realStateList.reduce((sum, value) => {
        const estimatedValue = value.estimated_value || 0;
        return sum + estimatedValue;
    }, 0);

    return (
        <div className='mt-4 bg-white p-2 border rounded-lg'>
            <div className="text-base font-bold text-slate-600 uppercase text-center">NETWORTH INVENTORY</div>
            <div role="alert" className="rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="mt-2 text-sm">
                    The net worth inventory is important in financial planning because it provides a snapshot of your financial situation by calculating the difference between your assets and liabilities. It helps assess your financial health, set realistic goals, manage cash flow, handle debts effectively, allocate assets, and plan for the future. Regularly updating your net worth inventory allows you to track progress, make informed decisions, and maintain financial stability
                </p>
            </div>

            <div className='mt-4'>
                <div className="text-base sm:py-2 font-bold text-slate-600 uppercase">ASSETS</div>
                <CashAndDeposits cashAndDepositsList={cashAndDepositsList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalEstimatedValue={totalEstimatedValue} />
                <Receivables receivablesList={receivablesList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalReceivablesEstimatedValue={totalReceivablesEstimatedValue} showCLIMonth={showCLIMonth} />

                <div className='mt-8 ml-2'>
                    <div className=''>
                        <button className='px-4 py-2 bg-gray-200 flex items-center gap-4 font-bold text-slate-600 uppercase'>
                            FINANCIAL ASSETS <IoIosInformationCircle className='text-lg' />
                        </button>
                    </div>
                    <MutualFunds mutualFundsList={mutualFundsList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalMutualFundsEstimatedValue={totalMutualFundsEstimatedValue} />
                    <Bonds bondsList={bondsList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalBondsEstimatedValue={totalBondsEstimatedValue} />
                    <StocksInListedCompany stocksInListedList={stocksInListedList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalStocksInListedEstimatedValue={totalStocksInListedEstimatedValue} />
                    <StocksInNonListedCompany stocksNonListedList={stocksNonListedList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalStocksNonListedEstimatedValue={totalStocksNonListedEstimatedValue} />
                    <FamilyLifeAndHealthInsuranceAetos familyInsuranceAdviserList={familyInsuranceAdviserList} setFamilyInsuranceAdviserList={setFamilyInsuranceAdviserList} clientID={clientID} totalFamilyInsuranceCurrentAccountValue={totalFamilyInsuranceCurrentAccountValue} />
                    <FamilyLifeAndHealthInsurance familyInsuranceNotAdviserList={familyInsuranceNotAdviserList} setFamilyInsuranceNotAdviserList={setFamilyInsuranceNotAdviserList} clientID={clientID} totalFamilyInsuranceNotAdviserCurrentAccountValue={totalFamilyInsuranceNotAdviserCurrentAccountValue} />
                </div>
                <FamilyHome familyHomeList={familyHomeList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalFamilyHomeEstimatedValue={totalFamilyHomeEstimatedValue} showFamilyHomeRenewalMonth={showFamilyHomeRenewalMonth} />
                <RealState realStateList={realStateList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalRealStateEstimatedValue={totalRealStateEstimatedValue} showRealStateRenewalMonth={showRealStateRenewalMonth} />
                <Vehicle vehiclesList={vehiclesList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalVehiclesEstimatedValue={totalVehiclesEstimatedValue} showRenewalMonth={showRenewalMonth} />
                <PersonalAssets personalAssetsList={personalAssetsList} familyCompositionList={familyCompositionList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} totalPersonalAssetsEstimatedValue={totalPersonalAssetsEstimatedValue} />
                <TotalAssets />
                <div className="mt-8 text-base sm:py-2 font-bold text-slate-600 uppercase">LIABILITIES</div>
                <Liabilities liabilitiesList={liabilitiesList} clientID={clientID} handleInputChange={handleInputChange} handleAddInputForm={handleAddInputForm} removeOtherInputFields={removeOtherInputFields} />
                <TotalNetworth />
            </div>

            <div role="alert" className="mt-8 rounded border-s-4 border-green-500 bg-green-50 p-4">
                <p className="text-sm">
                    *SAVINGS (SA), CHECKING (CA), TIME DEPOSIT (TD), SPECIAL DEPOSIT ACCOUNT (SDA), MUTUAL FUND (MF), UTIF, ETC.
                </p>
                <p>
                    **HUSBAND (H), WIFE (W), JOINT: HUSBAND & WIFE (JHB); EITHER SPOUSE WITH CHILDREN, indicate number of children e.g. WIFE with 2 CHILDREN (WC2)
                </p>
            </div>

            <div className='sticky bottom-0 mt-8 bg-white flex justify-between py-4'>
                <Link
                    className="group relative inline-flex items-center overflow-hidden rounded border border-current px-8 py-2 text-indigo-600 focus:outline-none focus:ring active:text-indigo-500"
                    href={"/admin/clients/networth-inventory-summary"}

                >
                    <span className="absolute -start-full transition-all group-hover:start-4">
                        <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0 4-4m-4 4h18"
                            />
                        </svg>
                    </span>

                    <span className="text-sm font-medium transition-all group-hover:ms-4">
                        {" "}
                        Back{" "}
                    </span>
                </Link>

                <button
                    onClick={handleSubmitForms}
                    className={` bg-blue-800 px-8 py-2 font-medium text-white rounded-lg sm:w-auto transition-all duration-300 ${isButtonDisabled ? 'disabled:bottom-auto' : ''
                        }`}
                >
                    Save
                </button>

            </div>

            <div role="alert" className="mt-8 rounded border-s-4 border-yellow-500 bg-yellow-50 p-4">
                <p className="mt-2 text-sm">
                    The value of the advise that we will give you will highly depend on the amount and value of information that you will provide us. Rest assure that all the information you will share will be kept confidential.
                </p>
            </div>

        </div>
    )
}

export default NetworthInventoryPage
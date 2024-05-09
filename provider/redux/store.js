'use client'
import { configureStore } from '@reduxjs/toolkit'
import { StateController } from './StateController'

export const store = configureStore({
    reducer: {
        'StateController' : StateController.reducer
    }
})

export default store
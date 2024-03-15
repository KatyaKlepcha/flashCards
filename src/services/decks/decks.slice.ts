import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState = {
  addDeckName: '',
  authorId: '',
  currentPage: 1,
  editDeckName: '',
  itemsPerPage: 10,
  maxCardsCount: '100',
  minCardsCount: '0',
  myCardsPage: {
    currentPage: '1',
    itemsPerPage: '10',
  },
  orderBy: 'updated-desc',
  searchByName: '',
  tabValue: 'allCards',
}

export const decksSlice = createSlice({
  initialState: initialState,
  name: 'decks',
  reducers: {
    setCardsByAuthor: (
      state,
      action: PayloadAction<{ authorId: string; tabValue: 'allCards' | 'myCards' }>
    ) => {
      state.authorId = action.payload.authorId
      state.tabValue = action.payload.tabValue
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
    setCurrentPageMyDeck: (state, action: PayloadAction<string>) => {
      state.myCardsPage.currentPage = action.payload
    },
    setDeckName: (state, action: PayloadAction<string>) => {
      state.addDeckName = action.payload
    },
    setEditDeckName: (state, action: PayloadAction<string>) => {
      state.editDeckName = action.payload
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.itemsPerPage = action.payload
    },
    setItemsPerPageMyDeck: (state, action: PayloadAction<string>) => {
      state.myCardsPage.itemsPerPage = action.payload
    },
    setMinMaxCardsCount: (state, action: PayloadAction<number[]>) => {
      state.minCardsCount = action.payload[0].toString()
      state.maxCardsCount = action.payload[1].toString()
    },
    setOrderBy: (state, action: PayloadAction<string>) => {
      state.orderBy = action.payload
    },
    setSearchByName: (state, action: PayloadAction<string>) => {
      state.searchByName = action.payload
    },
  },
})

export const {
  setCardsByAuthor,
  setCurrentPage,
  setCurrentPageMyDeck,
  setDeckName,
  setEditDeckName,
  setItemsPerPage,
  setItemsPerPageMyDeck,
  setMinMaxCardsCount,
  setOrderBy,
  setSearchByName,
} = decksSlice.actions

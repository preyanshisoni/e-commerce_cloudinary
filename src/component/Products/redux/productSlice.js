import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';



export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await axios.get('http://localhost:3000/products/getproductlist');
    return response.data.products;
  });
  
export const fetchUniqueCategory = createAsyncThunk('products/fetchUniqueCategory', async () => {
  const response = await axios.get("http://localhost:3000/products/fetchCategoryByNameID");
    console.log("unique_category data ",response.data.data);
  return response.data.data;
});


export const fetchProductsByCategoryId = createAsyncThunk('products/fetchProductsByCategoryId', async (subId) => {
  const response = await axios.get(`http://localhost:3000/products/fetchProductsByCategoryId/${subId}`);
    console.log("fetch data by subId id ",response.data.data);
  return response.data.data;
});

export const fetchCategories = createAsyncThunk('products/fetchCategories', async () => {
  const response = await axios.get("http://localhost:3000/products/fetchUniqueCategory");
    console.log("fetch unique unique categories ",response.data.data);
  return response.data.data;
});


export const fetchDataBySectionId = createAsyncThunk('products/fetchDataSectionId', async (sectionId) => {
  const response = await axios.get(`http://localhost:3000/products/fetchDataBySectionId/${sectionId}`);
    console.log("fetch data by section id ",response.data.data);
  return response.data.data;
});


const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    uniqueCategories: [], 
    fetchCategory:[],
    fetchDataSectionId:[],
    searchTerm: '',
    loading: false,
    error: null,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
     
      .addCase(fetchProductsByCategoryId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategoryId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchProductsByCategoryId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchCategory=action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(fetchUniqueCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUniqueCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.uniqueCategories = action.payload; 
      })
      .addCase(fetchUniqueCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      })
      .addCase(fetchDataBySectionId.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDataBySectionId.fulfilled, (state, action) => {
        state.loading = false;
        state.fetchDataSectionId = action.payload; 
      })
      .addCase(fetchDataBySectionId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message; 
      });


  },
});

export const { setSearchTerm } = productSlice.actions;
export default productSlice.reducer;

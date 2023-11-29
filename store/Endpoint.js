import {api} from "../store/baseurl";
 
const NeuroNFT = api.injectEndpoints({
    endpoints: (builder) => ({


      nftCreate: builder.mutation({
        query: (collData) => ({
          url: "/nft-collection/Createcollection",
          method: "POST",
          body: collData,
          formData:true
        }),
        invalidatesTags: ["NFTCollection"],
      }),


      SubmitKYC: builder.mutation({
        query: (NeuroNFT) => ({
          url: "/submitKYC",
          method: "POST",
          body: NeuroNFT,
        }),
        invalidatesTags: ["NFTCollection"],
      }),

    })
  });
  
export const {useNftCreateMutation, useSubmitKYCMutation } = NeuroNFT;
import React, { useState } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown, Modal, UncontrolledPopover, PopoverBody, UncontrolledTooltip } from 'reactstrap';
import angleDown from "../../assets/images/angleDown.svg";
import aiPfpClub from '../../assets/images/itemIcons/aiPfpClub.png';
import IconModal from '../../assets/images/IconModal.png';
import walletLoaderCnt from "../../assets/images/walletLoader.png";
import yellowTick from "../../assets/images/collection/yellow-tick_20px.svg";
import copyIcon from '../../assets/images/copyIcon.svg';
import logoImg from '../../assets/images/logoImg.png';
import coverImg from '../../assets/images/coverImg.png';
import Pencil from '../../assets/images/Pencil.svg';
import twitter from '../../assets/images/twitterNew.svg';
import instagram from '../../assets/images/instagram.svg';
import globe from '../../assets/images/globe.svg';
import infoIcon from '../../assets/images/infoIcon.svg';
import facebook from '../../assets/images/facebook.svg';
import twitterNew from '../../assets/images/twitterNew.svg';
import telegram from '../../assets/images/telegram-plane.svg';
import checkIcon from '../../assets/images/toast/checkIcon.svg';
//import '../MyCollection/myCollection.scss';
import '../../assets/scss/mycollecion_mint.scss';
import './Settings.scss';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSubmitKYCMutation } from '../../store/Endpoint';
import axios from 'axios';

export const Kyc = () => {

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  const CheckTick = () => {
    return (
      <>
        <svg className="ml-auto" width="12" height="9" viewBox="0 0 12 9" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.1953 0.46875C10.3125 0.351562 10.5 0.351562 10.5938 0.46875L11.2734 1.125C11.3672 1.24219 11.3672 1.42969 11.2734 1.52344L4.24219 8.55469C4.125 8.67188 3.96094 8.67188 3.84375 8.55469L0.703125 5.4375C0.609375 5.32031 0.609375 5.13281 0.703125 5.03906L1.38281 4.35938C1.47656 4.26562 1.66406 4.26562 1.78125 4.35938L4.03125 6.63281L10.1953 0.46875Z" fill="#55f764" />
        </svg>
      </>
    )
  }

  const [LicenseNumber, setLicenseNumber] = useState('');
  const [PANNumber, setPANNumber] = useState('');
  const [frontSideImg, setFrontSideImg] = useState(null);
  const [backSideImg, setBackSideImg] = useState(null);
  const [kycSelfieImg, setKycSelfieImg] = useState(null);

  const handleFileChange = (event, setImgSrc) => {
    const file = event.target.files[0];
    if (file) {
      setImgSrc(file);
      setModal(true);
    }
  };


  const validationSchema = Yup.object().shape({

    LicenseNumber: Yup.string()
      .required('Aadhar number is required')
      .matches(
        /^[0-9\b]+$/,
        'Aadhar number be Number'
      )
      .min(15, 'LicenseNumber must have 15 characters')
      .max(15, 'LicenseNumber must have 15 characters'),
      PANNumber: Yup.string()
      .required('Aadhar number is required')
      .matches(
        /^[0-9\b]+$/,
        'Aadhar number be Number'
      )
      .min(8, 'PAN number must have 8 characters')
      .max(8, 'PAN number must have 8 characters'),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(validationSchema),
    mode: 'all'
  });

  const [submitKyc, { isLoading, isError }] = useSubmitKYCMutation();


  const onSubmit = async (data) => {
    console.log('hjk');
    try {
      const formData = new FormData();
      formData.append('LicenseNumber', LicenseNumber);
      formData.append('PANNumber', PANNumber);
      formData.append('frontSideImg', frontSideImg);
      formData.append('backSideImg', backSideImg);
      formData.append('kycSelfieImg', kycSelfieImg);

      // const response = await submitKyc(formData).unwrap();
      console.log(formData);

      // Handle the response as needed

      // Reset form and image previews
      reset();
      setFrontSideImg(null);
      setBackSideImg(null);
      setKycSelfieImg(null);

      // Display a success toast
      toast.success('KYC submitted successfully', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      console.error('Error:', error);
      // Handle errors or display a toast/message
      toast.error('Failed to submit KYC', {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <>
      <div className="d-flex align-items-center mb-3">
        <h3 className="settingsHeading mb-0">KYC</h3>
      </div>
      <div className="createCollectionCard mb-3">
        {/* <form className="w-100" onSubmit={handleSubmit(onSubmit)}> */}
        <form className="w-100" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

          <div className='form-row'>

            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel">Select Proof</span>
                {/* <label className="text-danger errLabel ml-auto">This collection name already exist</label> */}
              </div>

              <select className="form-control" >
                <option>License</option>
                <option value="1">PAN</option>
              </select>
            </div>

            <div className="col-12 mb-3">
              <div className="d-flex align-items-center flex-wrap">
                <span className="formLabel">License / PAN Number </span>
                {/* <label className="text-danger errLabel ml-auto">This collection name already exist</label> */}
              </div>



              
              <input type="text" placeholder="Enter Number"
                {...register('LicenseNumber')}
                className={`form-control ${errors.LicenseNumber ? 'is-invalid' : ''}`}
                value={LicenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
              <div className="invalid-feedback">{errors.LicenseNumber?.message}</div>

            </div>

            {/* <input type="text" placeholder="Enter Number"
                {...register('LicenseNumber')}
                className={`form-control ${errors.LicenseNumber ? 'is-invalid' : ''}`}
                value={LicenseNumber}
                onChange={(e) => setLicenseNumber(e.target.value)}
              />
              <div className="invalid-feedback">{errors.LicenseNumber?.message}</div> */}           



             <div className="col-12 mb-3 d-flex align-items-center flex-wrap">
              <div className="coverContainer">
                <span className="formLabel">Front Side ID Proof</span>
                <div className="coverCnt d-flex flex-column">
                  <img className="coverImg" src={frontSideImg ? URL.createObjectURL(frontSideImg) : coverImg} alt="Front Side ID Proof" />
                  <div className="justify-content-center align-items-center editIcon">
                    <input
                      type="file"
                      id="frontSideImg"
                      name="frontSideImg"  // Make sure the name attribute matches the expected key in req.files
                      style={{ position: "absolute", opacity: "0", width: "100%" }}
                      role="button"
                      onChange={(e) => handleFileChange(e, setFrontSideImg)}
                    />
                    <label role="button" htmlFor="frontSideImg">
                      <img src={Pencil} alt="Edit Icon" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-3 d-flex align-items-center flex-wrap">
              <div className="coverContainer">
                <span className="formLabel">Back Side ID Proof</span>
                <div className="coverCnt d-flex flex-column">
                  <img className="coverImg" src={backSideImg ? URL.createObjectURL(backSideImg) : coverImg} alt="Back Side ID Proof" />
                  <div className="justify-content-center align-items-center editIcon">
                    <input
                      type="file"
                      id="backSideImg"
                      name="backSideImg"
                      style={{ position: "absolute", opacity: "0", width: "100%" }}
                      role="button"
                      onChange={(e) => handleFileChange(e, setBackSideImg)}
                    />
                    <label role="button" htmlFor="backSideImg">
                      <img src={Pencil} alt="Edit Icon" />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mb-3 d-flex align-items-center flex-wrap">
              <div className="coverContainer">
                <span className="formLabel">KYC Selfie with ID Proof</span>
                <div className="coverCnt d-flex flex-column">
                  <img className="coverImg" src={kycSelfieImg ? URL.createObjectURL(kycSelfieImg) : coverImg} alt="KYC Selfie with ID Proof" />
                  <div className="justify-content-center align-items-center editIcon">
                    <input
                      type="file"
                      id="kycSelfieImg"
                      name="kycSelfieImg"
                      style={{ position: "absolute", opacity: "0", width: "100%" }}
                      role="button"
                      onChange={(e) => handleFileChange(e, setKycSelfieImg)}
                    />
                    <label role="button" htmlFor="kycSelfieImg">
                      <img src={Pencil} alt="Edit Icon" />
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn gradientBtn mt-2">Submit</button>
            </div>
          </div>

        </form>
      </div>
 

      <Modal isOpen={modal1} toggle={toggle1} centered="true" className="curMdl createScsMdl" backdropClassName="selCurBp">
        <div className="createContent">
          <button className="btn closeBtn" onClick={toggle}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.46875 6L10.8438 9.375C11.0312 9.5625 11.0312 9.90625 10.8438 10.0938L10.0625 10.875C9.875 11.0625 9.53125 11.0625 9.34375 10.875L6 7.5L2.625 10.875C2.4375 11.0625 2.09375 11.0625 1.90625 10.875L1.125 10.0938C0.9375 9.90625 0.9375 9.5625 1.125 9.375L4.5 6L1.125 2.65625C0.9375 2.46875 0.9375 2.125 1.125 1.9375L1.90625 1.15625C2.09375 0.96875 2.4375 0.96875 2.625 1.15625L6 4.53125L9.34375 1.15625C9.53125 0.96875 9.875 0.96875 10.0625 1.15625L10.8438 1.9375C11.0312 2.125 11.0312 2.46875 10.8438 2.65625L7.46875 6Z" fill="#595F6A" />
            </svg>
          </button>

          <div className="w-100">
            <div className="d-flex justify-content-center">
              <img src={IconModal} />
            </div>
            <h3 className="walletHeading my-2">Are you sure?</h3>
            <h3 className="walletSubHeading mb-3 ">You are about to leave this page. All unsaved changes will be lost. Are you sure?</h3>
            <button type="button" className="btn btn-block gradientBtn mb-2">Continue Editing</button>
            <button type="button" className="btn btn-block darkBtn">Discard Changes</button>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default Kyc;
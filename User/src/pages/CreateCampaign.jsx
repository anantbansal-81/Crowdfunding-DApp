import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStateContext } from "../context";
import { ethers } from "ethers";
import { money } from "../assets";
import { CustomButton, FormField } from "../components";
import { checkIfImage } from "../utils";
const CreateCampaign = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createCampaign } = useStateContext();
  const [form, setForm] = useState({
    name: "",
    title: "",
    target: "",
    deadline: "", //0xb0A3EEC5ba05d9b32944EDB4b3D26BB9ECB7280F
    image: "",
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.image, async (exists) => {
      if (exists) {
        setIsLoading(true);
        await createCampaign({
          ...form,
          target: ethers.utils.parseUnits(form.target, 18),
        });
        setIsLoading(false);
        navigate("/");
      } else {
        alert("Provide valid image URL");
        setForm({ ...form, image: "" });
      }
    });

    console.log(form);
  };
  return (
    <div className='bg-[#1c1c24] flex justify-center items-center flex-col rounded-[10px] sm:p-10 p-4 mt-2'>
      {isLoading && "loader"}
      <div className='flex justify-center items-center p-[16px] sm:w-min-w-[380px] bg-[#3a3a43] rounded-[10px]'>
        <h1 className='font-epilogue font-bold sm:text-[25px] text-[18px] leading-[38px] text-white'>
          Start a Campaign 🚀
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className='w-full flex flex-col gap-[30px] mt-[20px]'
      >
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            LabelName='Your Name *'
            placeholder='Fuzail Kazi'
            inputType='text'
            value={form.name}
            handleChange={(e) => {
              handleFormFieldChange("name", e);
            }}
          />
          <FormField
            LabelName='Campaign Title *'
            placeholder='Write a Title'
            inputType='text'
            value={form.title}
            handleChange={(e) => {
              handleFormFieldChange("title", e);
            }}
          />
        </div>
        <FormField
          LabelName='Story *'
          placeholder='Write a Story'
          isTextArea
          value={form.description}
          handleChange={(e) => {
            handleFormFieldChange("description", e);
          }}
        />

        <div className='w-full flex justify-start items-center p-4 bg-[#8c6dfd] h-[120px] rounded-[10px] mt-2'>
          <img
            src={money}
            alt='money'
            className='w-[40px] h-[40px] object-contain'
          />
          <h4 className='font-bold font-epilogue text-[25px] text-white ml-[20px]'>
            You will get 100% of the raised amount
          </h4>
        </div>
        <div className='flex flex-wrap gap-[40px]'>
          <FormField
            LabelName='Goal *'
            placeholder='0.5 ETH'
            inputType='text'
            value={form.target}
            handleChange={(e) => {
              handleFormFieldChange("target", e);
            }}
          />
          <FormField
            LabelName='End Date *'
            placeholder='End Date'
            inputType='date'
            value={form.deadline}
            handleChange={(e) => {
              handleFormFieldChange("deadline", e);
            }}
          />
        </div>
        <FormField
          LabelName='Campaign Image *'
          placeholder='Paste the link of the Campaign image'
          inputType='url'
          value={form.image}
          handleChange={(e) => {
            handleFormFieldChange("image", e);
          }}
        />

        <div className='flex justify-center items-center mt-[40px]'>
          <CustomButton
            btnType='submit'
            title='Submit new Campaign'
            styles='bg-[#1dc071]'
          />
        </div>
      </form>
    </div>
  );
};

export default CreateCampaign;

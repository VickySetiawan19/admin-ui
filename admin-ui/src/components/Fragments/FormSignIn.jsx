import React from 'react'
import LabeledInput from '../Elements/LabeledInput'
import Button from '../Elements/Button'
import CheckBox from '../Elements/CheckBox'
import { Link } from "react-router-dom";
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
  password: Yup.string().required("Password wajib diisi"),
});

function FormSignIn({ onSubmit }) {
  return (
    <>
    {/* form start */}
            <div className="mt-16">
				<Formik
                    initialValues={{
                        email: "",
                        password: "",
                        status: false,
                    }}
                    validationSchema={SignInSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        try {
                        await onSubmit(values.email, values.password);
                        } finally {
                        setSubmitting(false);
                        }
                    }}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                            							{/* EMAIL */}
              <div className="mb-6">
                <Field name="email">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="email"
                      type="email"
                      label="Email Address"
                      placeholder="hello@example.com"
                    />
                  )}
                </Field>
                                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                />  
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <Field name="password">
                  {({ field }) => (
                    <LabeledInput
                      {...field}
                      id="password"
                      type="password"
                      label="Password"
                      placeholder="●●●●●●●●●●●●●●"
                    />
                  )}
                </Field> 
                                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-red-500 text-xs mt-1"
                /> 
              </div>

              {/* CHECKBOX */}
              <div className="mb-3">
                <Field name="status">
                  {({ field }) => (
                    <CheckBox
                      {...field}
                      id="status"
                      type="checkbox"
                      checked={field.value}
                      label="Keep me signed in"
                    />
                  )}
                </Field>
              </div>

              							{/* BUTTON */}
              <Button>{isSubmitting ? "Loading..." : "Login"}</Button>
                            </Form>
                        )}
                    </Formik>

            
            </div>
            {/* form end */}
            {/* teks start */}
            <div className="my-9 px-7 flex flex-col justify-center items-center text-xs text-gray-03">
            <div className="border border-gray-05 w-full"></div>
            <div className="px-2 bg-special-mainBg absolute"> or sign in with</div>
            </div>
            {/* teks end */}
            {/* sign in with google start */}
            <div className="mb-8">
                <Button type="button" variant="secondary">
                    <span className="flex items-center justify-center">
                            <svg
                            className="h-6 w-6 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            width="800"
                            height="800"
                            viewBox="-0.5 0 48 48"
                            version="1.1"
                        >
                            <title>Google-color</title> <desc>Created with Sketch.</desc>
                            <defs> </defs>
                            <g
                                id="Icons"
                                stroke="none"
                                strokeWidth="1"
                                fill="none"
                                fillRule="evenodd"
                            
                            >
                            </g>
                        </svg>
                            Continue with Google
                    </span>
                </Button>
            </div>
            
            {/* sign in with google end */}
            {/* link start */}
            <div className='flex justify-center'>
                <Link to="/register" className='text-primary text-sm font-bold'>
                    Create an account
                </Link>
            </div>
            {/* link end */}
    </>
  )
}

export default FormSignIn
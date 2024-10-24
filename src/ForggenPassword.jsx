import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const navigate = useNavigate(); // Use the navigate hook for redirection

    const formik = useFormik({
        initialValues: {
            email: ''
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Required')
        }),
        onSubmit: async (values) => {
            let backendurl = "https://project-backend-rxfi.onrender.com/users/forgot-password";
            try {
                const response = await axios.post(backendurl, values);

                if (response.data.status === 200) {
                    
                    swal.fire({
                        title: 'Success',
                        text: 'Please reset your password.',
                        icon: 'success'
                    });
                    navigate('/resetpassword');
                }
            } catch (error) {
                swal.fire({
                    title: 'Error',
                    text: 'An error occurred. Please try again.',
                    icon: 'error'
                });
            }
        }
    });

    return (
        <div className="container-fluid">
            <div className="form_area">
                <form onSubmit={formik.handleSubmit}>
                    <h1 className='title'>Forgot Password</h1>
                    <div className="form_group">
                        <input
                            type="email"
                            placeholder='Email'
                            name='email'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className='form_style'
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className='text-danger'>{formik.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="form_group">
                        <button type="submit" className="btn">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ForgotPassword;

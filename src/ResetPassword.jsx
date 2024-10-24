import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import swal from 'sweetalert2';
import axios from 'axios';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {
    const navigate = useNavigate()
    const { token } = useParams(); 

    const formik = useFormik({
        initialValues: {
            password: '',
            confirmPassword: ''
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Required')
        }),
        onSubmit: async (values) => {
            const backendurl = `https://vercel.com/okunade-adeolas-projects/project-backend/users/reset-password`;
            try {
                const response = await axios.post(backendurl, { token, password: values.password });
                console.log(response.data);
                if (response.data.status === 200) {
                    swal.fire({
                        title: 'Success',
                        text: 'Password reset successful',
                        icon: 'success'
                    });
                    navigate('/login')
                }
            } catch (error) {
                console.log(error);
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
                    <h1 className='title'>Reset Password</h1>
                    <div className="form_group">
                        <input
                            type="password"
                            placeholder='New Password'
                            name='password'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className='form_style'
                        />
                        {formik.touched.password && formik.errors.password ? (
                            <div className='text-danger'>{formik.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="form_group">
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            name='confirmPassword'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className='form_style'
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <div className='text-danger'>{formik.errors.confirmPassword}</div>
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

export default ResetPassword;

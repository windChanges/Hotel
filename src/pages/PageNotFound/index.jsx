import React from 'react'
import { Link } from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4'>
        <div className='text-center max-w-md'>
            <h1 className='text-9xl font-extrabold text-indigo-600 drop-shadow-md'>
                404
            </h1>
            <h2 className='mt-4 text-2xl font-semibold text-gray-800'>
                Opps! Trang không tồn tại
            </h2>
            <p>
                Trang bạn đang tìm kiếm có thể đã bị xóa, đổi đường dẫn hoặc chưa từng tồn tại.
            </p>
            {/* Action button */}
            <div className='mt-6 flex justify-center gap-4'>
                <Link 
                to="/"
                className='px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-md'
                >
                Về trang chủ
                </Link>
                <button
                onClick={()=> window.history.back()}
                className='px-6 py-3 rounded-lg border border-indigo-600 text-indigo-600 hover:bg-indigo-50 transition'
                >
                    Quay lại
                </button>
            </div>
        </div>
    </div>
  )
}

export default PageNotFound
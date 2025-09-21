import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const ref = useRef();
    const passwordref = useRef();
    const [form, setForm] = useState({site:"", username:"", password:""});
    const [passwordArray, setPasswordArray] = useState([]);

    useEffect(() => {
    let passwords =localStorage.getItem("passwords")
    if(passwords) {
        setPasswordArray(JSON.parse(passwords));
    }
    }, [])

    const showPassword = () => {
        if(ref.current.src.includes("icons/Eye-hide.png")) {
            ref.current.src = "icons/Eye.png"
        passwordref.current.type = "text";
        } else {
            ref.current.src = "icons/Eye-hide.png"
        passwordref.current.type = "password";
        }
    }

    // const deletePassword = () => {
    //     // setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    //     // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    //     // console.log(passwordArray)

    // }

    const deletePassword = (id) => {
      console.log("deleting", id);
      let confirming = confirm("Do you really want to delete the Password")
      if(confirming){
      setPasswordArray(passwordArray.filter(item => item.id !== id));
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)));
      toast('Password Deleted', {
        position: "top-right",
        autoClose: 3000,
        theme: "light",
    });
      }
    // const updatedArray = passwordArray.filter(item => item.id !== id);
    // setPasswordArray(updatedArray);
    // localStorage.setItem("passwords", JSON.stringify(updatedArray));
}

    const savePassword = () => {
    // Prevent saving if any field is empty
    if (!form.site.trim() || !form.username.trim() || !form.password.trim()) {
        toast('Please fill all fields!', {
            position: "top-right",
            autoClose: 3000,
            theme: "light",
        });
        return;
    }
    setPasswordArray([...passwordArray, {...form, id:uuidv4()}]);
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]));
    setForm({site:"", username:"", password:""});
    toast('Password Added Sucessfully', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
}

    const handelChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
}
  return (
    <>
    {/* <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={true}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition="Bounce"
/>*/}
<ToastContainer />
    <div className='bg-green-50 max-h-full min-h-[595px]'>
    <div className="container mx-auto bg-green-50 max-w-[60%] py-[10vh] text-center">
        <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>
            </div>
        <h2 className='text-green-700'>Your own password Manager</h2>
    <div className='text-black flex flex-col p-4 px-10 gap-5 items-center'>
        <input className='bg-white px-4 rounded-3xl border border-green-700 w-full h-[35px]' placeholder='Enter Website URL' type="text" value={form.site} onChange={handelChange} name='site' />
        <div className="flex gap-5">
            <input className='bg-white px-4 rounded-3xl w-[56vh] h-[35px] border border-green-700' placeholder='Enter UserName' type="text" value={form.username} onChange={handelChange} name='username' />
            <div className='relative'>
            <input ref={passwordref} className='bg-white px-4 rounded-3xl w-[56vh] h-[35px] border border-green-700' placeholder='Enter Password' type="password" value={form.password} onChange={handelChange} name='password' />
            <span className='absolute right-3 top-1.5' onClick={showPassword}><img className='cursor-pointer' src="icons/Eye-hide.png" alt="Show" ref={ref} /></span>
            </div>
        </div>
        <div className='item-center'>
            <button onClick={savePassword} className='w-50 bg-green-600 text-white p-1 rounded-3xl hover:bg-green-400 flex justify-center items-center'>
                <lord-icon
                    src="https://cdn.lordicon.com/efxgwrkc.json"
                    trigger="hover">
                </lord-icon>
                Save Password
            </button>
            </div>
        </div>
        <div className="container">
        <h2 className='font-bold py-3 text-2xl'>Your Passwords</h2>
        {passwordArray.length === 0 && <p className='text-green-700'>No Passwords Saved</p>}
        {passwordArray.length != 0 && <table className="table-auto w-full rounded-md overflow-hidden">
  <thead>
    <tr className='bg-green-800 text-white'>
      <th>Site</th>
      <th>UserName</th>
      <th>Password</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody className='bg-green-100 ' >
    {passwordArray.map((item) => (
  <tr key={item.id}>
    <td className='text-center min-w-32 py-1.5 border border-white'><a href={item.site} target='_blank'>{item.site}</a></td>
    <td className='text-center min-w-32 py-1.5 border border-white'>{item.username}</td>
    <td className='text-center min-w-32 py-1.5 border border-white'>{item.password}</td>
    <td className='text-center min-w-32 py-1.5 border border-white'>
      <span className='cursor-pointer'onClick={() => deletePassword(item.id)}>
        <lord-icon
          src="https://cdn.lordicon.com/xyfswyxf.json"
          trigger="hover"
          style={{ width: "25px", height: "25px" }}>
        </lord-icon>
      </span>
    </td>
  </tr>
))}

  </tbody>
</table>
}
    </div>
    </div>
    </div>
    </>
  )
}

export default Manager
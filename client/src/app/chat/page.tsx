"use client"; 

import Header from '../components/Header'
import Footer from '../components/Footer'
import ChatComponent from '../components/Chat'

export default function Chat(){
    return <div className='flex flex-col'>
           <Header/>
        <div className='min-h-[100vh] bg-gray-200 dark:bg-gray-600'>
            <ChatComponent/>
        </div>
        <Footer/>
    </div>
}
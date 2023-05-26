"use client"; 

import Header from '../components/Header'
import Footer from '../components/Footer'
import ChatComponent from '../components/Chat'

export default function Chat(){
    return <div>
           <Header/>
        <div className='min-h-[88vh]'>
            <ChatComponent/>
        </div>
        <Footer/>
    </div>
}
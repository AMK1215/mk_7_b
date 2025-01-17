import React from 'react'
import useFetch from '../hooks/useFetch';
import BASE_URL from '../hooks/baseURL';

export default function DepositLog() {
    const {data: deposit} = useFetch(BASE_URL + "/transaction/deposit-requestlog");
    const {data: channels} = useFetch(BASE_URL + "/agent-payment-type");
    
    const logs = deposit && deposit.data;
    let pages = deposit && deposit.links;

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }).format(date);
    };

    const banking = (id) => {
        const channel = channels.find((channel) => channel.id === id);
        return channel ? channel.payment_type.name : null;
    };
    const AccNo = (id) => {
        const channel = channels.find((channel) => channel.id === id);
        return channel ? channel.account_no : null;
    };
    const AccName = (id) => {
        const channel = channels.find((channel) => channel.id === id);
        return channel ? channel.account_name : null;
    };
    
  return (
    <div className='mt-3 mb-5 pb-4'>
        {logs && logs.map((log, index) => (
            <div className="card p-2 rounded-3 shadow bg-transparent border border-1 border-warning mb-3" key={index}>
                <div className="d-flex justify-content-between mb-2">
                    <div>
                        <small className={`badge text-bg-${log.status === 0 ? "warning" : ""}`}>
                            {log.status === 0 ? "စောင့်ဆိုင်း" : ""}
                        </small>
                        <small className={`badge text-bg-${log.status === 1 ? "success" : ""}`}>
                            {log.status === 1 ? "လွှဲပြီး" : ""}
                        </small>
                        <small className={`badge text-bg-${log.status === 2 ? "danger" : ""}`}>
                            {log.status === 2 ? "ငြင်းပယ်" : ""}
                        </small>
                    </div>
                    <div className="d-flex mb-1 text-white">
                        <div className='me-3'>
                          နေ့ရက်:
                        </div>
                        <div>
                          {formatDate(log.created_at)}
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-white'>
                        <span className='me-2'>ဘဏ်: </span>
                        <span>{banking(log.user_payment_id)}</span>
                    </div>
                    <div className='text-white'>
                        <span className='me-2'>လက်ခံသူ: </span>
                        <span>{AccName(log.user_payment_id)}</span>
                    </div>
                    <div className='text-white'>
                        <span className='me-2'>အကောင့်/ဖုန်း: </span>
                        <span>{AccNo(log.user_payment_id)}</span>
                    </div>
                    <div className='text-white'>
                        <span className='me-2'>ပမာဏ: </span>
                        <span>{Number(log.amount).toLocaleString()} MMK</span>
                    </div>
                    <div className='text-white'>
                        <span className='me-2'>ငွေလွဲကုဒ်: </span>
                        <span>{log.refrence_no}</span>
                    </div>
                </div>


            </div>
        ))}
        <div className="d-flex justify-content-center">
            {pages && pages.map((page, index) => (
                <button
                className={`btn btn-sm btn-${page.active === true ? "light" : "outline-light"} mx-1 `} {...(page.active === true ? {disabled: true} : {})}
                key={index}
                onClick={() => setUrl1(page.url)}
                >
                {index === 0 ? "<" : index === pages.length - 1 ? ">" : page.label}
                </button>
            ))}
        </div>
    </div>
  )
}

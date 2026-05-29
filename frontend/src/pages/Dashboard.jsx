import { a, div } from 'framer-motion/client'
import { ActivityIcon, CheckCircleIcon, ClockIcon, SendIcon, Share2Icon, TrendingUpIcon } from 'lucide-react'
import { useState, useEffect } from 'react'
import { dummyAccountsData, dummyActivityData, dummyPostsData } from '../assets/assets'

const Dashboard = () => {

  const [stats , setStats] = useState({scheduled:0, published:0, connectedAccounts:0 })
  const[activities , setActivities] =  useState([])

  useEffect(() => {
    const fetchDashboardData  = async()=>{
      try{
         const [postRes, accountRes, activityRes] = [{data: dummyPostsData},
          {data: dummyAccountsData}, {data:dummyActivityData}]
        const posts = postRes.data;

        setStats({
          scheduled: posts.filter((p) => p.status === 'scheduled').length,
          published: posts.filter((p) => p.status === 'published').length,
          connectedAccounts: accountRes.data.filter((a) => a.status === 'connected').length,
        })

        setActivities(activityRes.data)
      } catch(error){
          console.error("Error fetching dashboard data", error)
      }
    };
    fetchDashboardData();
  }, [])
  

  const statsCard = [
    {
      label: "Scheduled Posts",
      value : stats.scheduled,
      icon: ClockIcon,
      trend: "+2 today"
    },
    {
      label: "Published Posts",
      value : stats.published,
      icon: CheckCircleIcon,
      trend: "All time"
    },
    {
      label: "Connected Accounts",
      value : stats.connectedAccounts,
      icon: Share2Icon,
      trend: "Active"
    }
  ]



  return (
    <div className='space-y-8 '>
        {/* welcome message */}
      <div>
        <h2 className='text-2xl text-slate-900'>Welcome Message</h2>
        <p className='text-slate-500 text-sm mt-0.5'>Here's what's happening with your social accounts today.</p>
      </div>

      {/* stats card */}
       <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
      {statsCard.map((card)=>(

        <div key={card.label} className='bg-white hover:bg-red-50 relative border border-slate-200 rounded-2xl p-5 hover:border:red-200 transition-all'>

          <div className='flex items-center justify-between mb-4'>

          <div className='text-3xl font-medium text-slate-800 tabular-nums'>{card.value}
          </div>

          <div>
            <TrendingUpIcon className='size-3'/>
            {card.trend}
          </div>

          </div>

          <p  className='text-sm text-slate-500 mt-1'>{card.label}</p>

        </div>
      ))}
       </div> 

       {/* Activity Feed */}
       <div className='bg-white rounded-2xl border border-slate-200 overflow-hidden'>

        <div className='flex items-center justify-between px-6 py-4 border-b border-slate-100'>
        <h2 className='text-slate-900'>Recent Activity</h2>
        <span className='text-sm text-slate-400'>{activities.length} events</span>
        </div>

        {activities.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-16 px-6'>
            <div className='size-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3'> 
              <ActivityIcon  className='size-6 text-slate-400'/>
            </div>
            <p className='text-slate-500'>No Activity Yet</p>
            <p className='text-slate-400 text-sm mt-1  '>Connect accounts and schedule posts to see events here.</p>
          </div>
        ) : (
          <div className='divide-y divide-slate-50'>
            {activities.map((activity)=>(
              <div key={activity._id} className='flex items-start gap-4 px-6 py-4 hover:bg-slate-50/50 transition-colors'>

              <div className='flex items-center justify-center size-9 rounded-xl shrink-0 mt-0.5 bg-zinc-100 text-zinc-600'>
                  <SendIcon className='size-4'/>
              </div>
              
              <div className='flex-1 min-w-0'>
                <div className='flex items-center justify-between gap-2 mb-1'> 
                  <span className='text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600'>Published</span>
                  <span className='text-xs text-slate-400 shrink-0'>
                    {new Date(activity.createdAt).toLocaleString()}
                  </span>
             
                </div> 
                <p className='text-sm text-slate-600'>
                {activities.description}
                </p>
              </div>

              </div>
            ))}
          </div>  
        )}

       </div>

    </div>
  )
}

export default Dashboard
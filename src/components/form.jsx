import React from "react";

const Form = ({ type, tweet, setTweet, handleSubmit }) => {
  return <div>

            {type==="Create"
            ?<form onSubmit={handleSubmit} className="flex flex-col w-[275px] md:w-[400px] gap-y-8">
                <div className="flex flex-col gap-y-4">
                    <textarea 
                        value={tweet.body}
                        onChange={(e)=> setTweet({...tweet, body:e.target.value})}
                        placeholder="Tweet..."
                        required
                        className="h-[200px] rounded-xl bg-transparent border-2 p-2 border-opacity-50"
                    />
                    <input 
                        value={tweet.tag}
                        onChange={(e) => setTweet({...tweet, tag: e.target.value})}
                        type='text'
                        required
                        placeholder="#Tag"
                        className=" rounded-xl bg-transparent border-2 px-2 py-1 border-opacity-50"
                    />
                </div>
                <button
                    type='submit'
                    className='px-5 py-1.5 text-sm rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-900 duration-200'
                >
                    submit
                </button>
            </form>
            :<form onSubmit={handleSubmit} className="flex flex-col w-[275px] md:w-[400px]  gap-y-8">
                <div className="flex flex-col gap-y-4">
                    <textarea 
                        value={tweet.body}
                        onChange={(e)=> setTweet({...tweet, body:e.target.value})}
                        required
                        className="h-[200px] rounded-xl bg-transparent border-2 p-2 border-opacity-50"
                        />
                    <input 
                        value={tweet.tag}
                        onChange={(e) => setTweet({...tweet, tag: e.target.value})}
                        type='text'
                        required
                        className=" rounded-xl bg-transparent border-2 px-2 py-1 border-opacity-50"
                    />
                </div>
                <button
                    type='submit'
                    className='px-5 py-1.5 text-sm rounded-lg bg-gradient-to-r from-green-400 to-green-600 hover:from-green-600 hover:to-green-900 duration-200'
                >
                    submit
                </button>
            </form>
            }
        </div>; 
  
};

export default Form;

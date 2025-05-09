import { useEffect, useState } from "react"
import { getAppDataByPlatform } from "../slices/appSlice"
import {useDispatch, useSelector} from 'react-redux'
const InfoPage = () => {
    const [selectedPlatform, setSelectedPlatform] = useState([])
    const [platformType, setPlatformType] = useState('')
    const [selectedAppData, setSelectedAppData] = useState(null)
    const ios = useSelector((state) => state?.apps?.ios)
    const android = useSelector((state) => state?.apps?.android)
    const status = useSelector((state) => state?.apps?.status)
    const dispatch = useDispatch()

    const handleAppDataFetch = (platform) => {
        setPlatformType(platform)
        if(platform === "ANDROID" && android.length === 0){
            dispatch(getAppDataByPlatform({platform})) 
        }else if(platform === "IOS" && ios.length === 0){
            dispatch(getAppDataByPlatform({platform}))
        }
        setSelectedPlatform(platform === "ANDROID" ? android : ios)
    }

    useEffect(() => {
        if (platformType === "ANDROID") {
          setSelectedPlatform(android);
        } else if (platformType === "IOS") {
          setSelectedPlatform(ios);
        }
        setSelectedAppData(null)
      }, [android, ios, platformType]);

    const handleDisplayAppData = (appName) => {
        setSelectedAppData((platformType === "ANDROID" ? android : ios).find((app) => app.appName === appName && app.platform === platformType))
    }
  return (
    <>
        <div className='container'>
            <div className='my-3'>
                <h5>All Apps Mail-Ids and App-Links</h5> <p><strong>NOTE: </strong> This is still in testing phase so please update us if there is any app missing or something needs to be updated..</p>
                <hr/>
                <div className='my-3'>
                <div className="d-flex">
                    <div>
                    <label>Select Platform: </label>
                    <select className='mx-3' onChange={(e) => handleAppDataFetch(e.target.value)}>
                        <option value="" hidden>Choose any one</option>
                        <option value='IOS'>IOS</option>
                        <option value='ANDROID'>Android</option>
                    </select>
                    </div>
                    <div>
                        {status === "loading" ? <p>Loading...</p> : ""}
                    </div>
                    <div>
                   {status === "success" && selectedPlatform.length > 0 ? <><label>Select App: </label>
                    <select className='mx-3' onChange={(e) => handleDisplayAppData(e.target.value)}>
                        <option value='' hidden>Choose a App</option>
                        {selectedPlatform.map((platform,i) => <option key={i}>{platform.appName}</option>)}
                    </select></> : ""}
                    </div>
                </div>
                </div>
            </div>
            {selectedAppData && <div className="card col-md-6">
                <div className="card-body d-flex flex-column">
                {selectedAppData ? <><p>App: {selectedAppData.appName}</p> <p>App Link: {selectedAppData.appLink}</p> <p>App Email: {selectedAppData.appMailId}</p></> : ""}
                </div>
            </div>}
        </div>
    </>
  )
}

export default InfoPage
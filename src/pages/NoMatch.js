import { Alert } from '@mui/material';
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';



export default function NoMatch() {
    const history = useHistory()
    useEffect(() => {
        setTimeout(() => {
            history.goBack();
    },2000)
    },[history])

    return (
        <div>
            <Alert severity="error">Page not Found redirecting...</Alert>
        </div>
    )
}

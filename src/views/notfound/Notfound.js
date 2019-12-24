import React from 'react';
import Typography from '@material-ui/core/Typography';


export default function Notfound() {
    return (
        <div style={{ marginTop: 100 }}>
            <Typography variant="h4" component="h4">
                404: The page you are looking for isn’t here
                </Typography>
            <Typography variant="h6" component="h6">
                You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
            </Typography>
        </div>
    );
}
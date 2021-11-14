import { Chip, ChipTypeMap, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { ILog } from '../models'

interface IProps {
    logStatusCounts: Record<ILog["type"],number>
}

export const LogStatus:React.FC<IProps> = ({ logStatusCounts }) => {
    const renderStatusCount = React.useCallback(
        ([key,value]:(string|number)[])=> (
            <Box display="flex" alignItems="center" marginRight={2}>
                <Box marginRight={1}>
                    <Typography variant="body1">{key}</Typography>
                </Box>
                <Chip color={key.toString().toLowerCase() as ChipTypeMap["props"]["color"]} label={value} />
            </Box>
        ), 
        []
    );

    return (
        <Box padding={2}>
            <Box marginBottom={1}>
                <Typography variant="h5">Log status counts:</Typography>
            </Box>
            <Paper>
                <Box padding={1}>
                    <Box display="flex">
                        {Object.entries(logStatusCounts).map(renderStatusCount)}
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

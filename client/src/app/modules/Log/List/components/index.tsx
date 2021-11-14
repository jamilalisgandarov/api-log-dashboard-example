import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import React from 'react'
import { useDispatch } from 'react-redux';
import { IndexRange } from 'react-virtualized';
import { useAppSelector } from '../../../../hooks'
import { ILog } from '../models';
import { logService } from '../service';
import { fetchLogs, selectLogs } from '../state';
import { LogsTable } from './LogsTable';
import { LogStatus } from './LogStatus';

const useStyles = makeStyles({
    wrapper: {
        backgroundColor: '#f5f4f4',
        height: '100vh',
        display: "flex",
        flexDirection: "column",
    },
});

// Prefixing it with the module name in order to make it easy to find
export const LogList = () => {
    const classes = useStyles();
    const [currentlyShownLastIndex, setCurrentlyShownLastIndex] = React.useState(0);
    const { status,list } = useAppSelector(selectLogs);
    const dispatch = useDispatch();

    React.useEffect(()=>{
        dispatch(fetchLogs());
    },[dispatch]);

    // Refetch list of logs based response
    // hasChanged endpoint prevents loading 
    // whole list again even if there is no change
    React.useEffect(()=>{
        const intervalId = setInterval(()=>{
            logService.shouldFetchLogs().then((res)=>{
                if(res.hasChanged){
                    dispatch(fetchLogs());
                }
            });
        },2*1000);

        return ()=> clearInterval(intervalId);
    },[dispatch]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleRowsRendered = React.useCallback((info:IndexRange)=>{
        if(currentlyShownLastIndex < info.stopIndex){
            setCurrentlyShownLastIndex(info.stopIndex);
        }
    },[currentlyShownLastIndex]);

    // Maps log status to count up to last shown row index
    const statusCountMap = React.useMemo(()=>{
        return list.slice(0,currentlyShownLastIndex).reduce<Record<ILog["type"],number>>((acc,log)=>{
            switch (log.type) {
                case "ERROR":
                    acc.ERROR +=1;
                    break;
                case "WARNING":
                    acc.WARNING +=1;
                    break;
                case "INFO":
                    acc.INFO +=1;
                    break;
                default:
                    break;
            }

            return acc;
        },
        {
            "ERROR":0,
            "INFO":0,
            "WARNING":0,
        });
    },[currentlyShownLastIndex, list]);

    return (
        <div className={classes.wrapper}>
            <LogStatus logStatusCounts={statusCountMap} />
            <Box padding={2} flexGrow={1}>
                <LogsTable onRowsRendered={handleRowsRendered} isLoading={status==='loading'} logs={list} />
            </Box>
        </div>
    )
}

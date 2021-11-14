import { Chip, ChipTypeMap, Paper } from '@mui/material'
import { makeStyles } from '@mui/styles';

import React from 'react'
import { IndexRange, OverscanIndexRange } from 'react-virtualized';
import { VirtualizedTable } from '../../../Shared/components/VirtualizedTable'
import { ILog } from '../models'

interface IProps {
    logs: ILog[];
    isLoading: boolean;
    onRowsRendered: (info: IndexRange & OverscanIndexRange) => void;
}

const useStyles = makeStyles({
    table: {
        flex: 1,
        height: '100%'
    },
});

export const LogsTable:React.FC<IProps> = ({
    logs,
    isLoading,
    onRowsRendered,
}) => {
    const classes = useStyles();
    const getRow = React.useCallback(({index}:{index:number}) => {
        return logs[index];
    },[logs]);
    const renderStatusLabel = React.useCallback((status)=>{
        let color: ChipTypeMap['props']["color"] = "info";
        switch (status) {
            case "ERROR":
                color = "error";
                break;
            case "INFO":
                color = "info";
                break;
            case "WARNING":
                color="warning";
                break;
            default:
                break;
        }
        return <Chip color={color} label={status} />
    },[]);

    return (
        <Paper classes={{root: classes.table}}>
            {logs.length>0 && (
                <VirtualizedTable 
                    rowCount={logs.length}
                    rowGetter={getRow}
                    onRowsRendered={onRowsRendered}
                    columns={[
                        {
                            width: 250,
                            label: 'Date',
                            dataKey: 'date',
                        },
                        {
                            width: 600,
                            label: 'Description',
                            dataKey: 'description',
                            flexGrow: 1,
                        },
                        {
                            width: 120,
                            label: 'Type',
                            dataKey: 'type',
                            renderField: renderStatusLabel
                        },
                    ]}
                />
            )}
            {
                isLoading && '...Loading'
            }
        </Paper>
    )
}

import React from 'react'
import { makeStyles } from '@material-ui/styles'
import EditControl from './Edit'
import DownloadControl from './Download'

const useStyles = makeStyles({
  controls: {
    flexGrow: 0,
    minWidth: 200,
  },
})

const Controls = ({
  windowOptions,
  window,
  setWindow,
  aggregationOptions,
  aggregateBy,
  setAggregateBy,
  accumulateOptions,
  accumulate,
  setAccumulate,
  title,
  cumulativeData,
  currency,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.controls}>
      <EditControl
        windowOptions={windowOptions}
        window={window}
        setWindow={setWindow}
        aggregationOptions={aggregationOptions}
        aggregateBy={aggregateBy}
        setAggregateBy={setAggregateBy}
        accumulateOptions={accumulateOptions}
        accumulate={accumulate}
        setAccumulate={setAccumulate}
        currency={currency}
      />

      <DownloadControl
        cumulativeData={cumulativeData}
        title={title}
      />
    </div>
  )
}

export default React.memo(Controls)

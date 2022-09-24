import { Box, CircularProgress, MenuItem, Paper, Select } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Chart } from 'react-google-charts';
import { useDispatch, useSelector } from 'react-redux';
import {
  femaleMaleRatioChart,
  membersActionsChart,
  membersAgeChart,
  occupationRatioChart,
} from '../helpers/createChartData';
import { fetchAllMembers } from '../helpers/redux.helper';
import { capitalizeFirstLetter } from '../helpers/word.helpers';
import Header from './Header';

function Analytics() {
  const dispatch = useDispatch();
  const { members } = useSelector((state) => state.allMembers);
  const [selectedMember, setSelectedMember] = useState('all');
  const [loading, setLoading] = useState(true);

  const femaleMaleRatioChartData = femaleMaleRatioChart(members);
  const occupationRatioChartData = occupationRatioChart(members);
  const membersAgeChartData = membersAgeChart(members);
  const membersActionsChartData = membersActionsChart(selectedMember, members);

  useEffect(() => {
    setTimeout(() => {
      fetchAllMembers(dispatch).then(() => {
        setLoading(false);
      });
    }, 100);
  }, []);

  return loading ? (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CircularProgress thickness={5} size="7rem" color="secondary" />
    </Box>
  ) : (
    <>
      <Box
        sx={{
          width: '100%',
          py: { xs: '20px', sm: '30px' },
          px: { xs: '30px', sm: '60px', md: '70px', lg: '80px' },
        }}
      >
        <Header mb="15px">Library Analytics</Header>
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            gap: { xs: '6px', md: '10px' },
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'row wrap',
              gap: '10px',
              justifyContent: 'Center',
              alignItems: 'center',
              width: '100%',
              height: 'max-content',
            }}
          >
            <Chart
              chartType="PieChart"
              data={femaleMaleRatioChartData}
              height="200px"
              width="250px"
              options={{
                title: `Female / Male ratio graph`,
                backgroundColor: '',
                chartArea: { width: '100%', height: '80%' },
              }}
            />
            <Chart
              chartType="PieChart"
              data={occupationRatioChartData}
              height="200px"
              width="250px"
              options={{
                title: `Members occupation graph`,
                backgroundColor: '',
                chartArea: { width: '100%', height: '80%' },
              }}
            />
          </Box>
          <Chart
            chartType="Bar"
            data={membersAgeChartData}
            width="100%"
            height="300px"
            options={{
              chart: {
                title: `Members occupation graph`,
              },
              title: `Members occupation graph`,
              backgroundColor: '',
              legend: { position: 'none' },
            }}
          />
          <Select
            size="small"
            defaultValue="all"
            value={selectedMember}
            onChange={(e) => {
              setSelectedMember(e.target.value);
            }}
            sx={{ maxWidth: '400px', width: '100%', mt: '20px' }}
          >
            <MenuItem value="all">All Members</MenuItem>
            {members.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {capitalizeFirstLetter(name)}
              </MenuItem>
            ))}
          </Select>
        </Box>
      </Box>
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          p: '20px',
          pt: '0px',
        }}
      >
        <Chart
          chartType="LineChart"
          data={membersActionsChartData}
          width="100%"
          height="300px"
          options={{
            title: `Members actions graph`,
            backgroundColor: '',
            curveType: 'function',
            legend: { position: 'bottom' },
            chartArea: { width: '90%' },
          }}
        />
      </Paper>
    </>
  );
}

export default Analytics;

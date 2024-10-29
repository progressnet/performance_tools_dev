import { useState} from "react";
import { useLocation} from "react-router-dom";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

import {MyTasksTasksView} from "./tasks";
import {MyTasksProcessView} from "./processes";
import {MyTasksEntitiesView} from "./entities";
import {MyTasksSubProcessView} from "./subProcesses";
import {DashboardContent} from "../../layouts/dashboard";
import {useResponsiveWidth} from "../../hooks/use-resize";

const flexProps = { flex: '1 1 auto', display: 'flex', flexDirection: 'column' };


export function MyTasksLayout() {
  const width = useResponsiveWidth();
  const [tabsValue, setTabsValue] = useState<string>('processes');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const subprocessId = Number(searchParams.get('subprocessId'));
  const processId = Number(searchParams.get('id'));


  const renderMainView = () => {
    if (tabsValue === 'entities') return <MyTasksEntitiesView />;
    if (tabsValue === 'processes') {
      if (processId) return <MyTasksSubProcessView />;
      if (!processId && width <= 1179 && subprocessId > 0) return <MyTasksTasksView />;
      return <MyTasksProcessView />;
    }
    return null;
  };

  return (
    <DashboardContent maxWidth="xl" sx={{ ...flexProps }}>
      <Stack
        spacing={1}
        flexDirection="row"
        sx={{height: 'calc(100vh - 150px)',
          borderRadius: 2,
          backgroundColor: 'grey.200',
          p: 1,
          overflow: "hidden"
      }}>
        <Stack sx={{
          flex: 2,
          overflow: "hidden",
          borderRadius: 2,
          backgroundColor: 'white',
        }}>

          <FilterTabs
            value={tabsValue}
            setValue={setTabsValue}
          />
          <Divider/>
          {renderMainView()}
        </Stack>
        <Stack sx={{
          display: { xs: 'none', lg: 'flex' },
          flex: 3,
          height: '100%',
          borderRadius: 2,
          backgroundColor: subprocessId ? 'white' : 'transparent',
        }}>
          {subprocessId > 0 && <MyTasksTasksView />}
        </Stack>
      </Stack>
    </DashboardContent>
  )
}


export type FilterTabsProps = {
  value: string;
  setValue: (value: string) => void;

}

export const FilterTabs = (
  {
    value,
    setValue,
  }: FilterTabsProps) => {


  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack sx={{p:1, px:3}} spacing={2} flexDirection="row" alignItems="center">
      <Typography variant="h5">Filter:</Typography>
      <Tabs
        sx={{
          "& .MuiTab-root": {
            fontSize: '18px',
            color: 'gray',
            "&.Mui-selected": {
              color: 'blue',
            },
          },
          "& .MuiTabs-indicator": {
            bottom: 9,
            backgroundColor: 'blue',
          }
        }}
        value={value}
        onChange={handleChange}
        aria-label="secondary tabs example"
      >
        <Tab value="processes" label="By Processes"  />
        <Tab value="entities" label="By Entities" />
      </Tabs>
    </Stack>
  )
}

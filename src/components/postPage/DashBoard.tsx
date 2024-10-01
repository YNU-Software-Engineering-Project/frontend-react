import style from 'styles/PostPage/DashBoard.module.css';
import { PieChart } from '@mui/x-charts/PieChart';

const DashBoard = () => {
  const valueFormatter = (item: { value: number }) => `${item.value}%`;
  return (
    <>
      <div className={style.wrapper}>
        {/* <PieChart
          height={300}
          series={[
            {
              data: [
                {
                  label: 'Windows',
                  value: 72.72,
                },
              ],
              innerRadius: 80,
              arcLabel: params => params.label ?? '',
              arcLabelMinAngle: 20,
              valueFormatter,
            },
          ]}
        /> */}
      </div>
    </>
  );
};

export default DashBoard;

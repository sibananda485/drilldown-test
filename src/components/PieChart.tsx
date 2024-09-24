import { useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import drilldown from "highcharts/modules/drilldown";
import { Button } from "./ui/button";
import LeadTable from "./lead/LeadTable";
import { MdCancelPresentation } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { drillDownData, mainChartData } from "@/lib/dummyData";

drilldown(Highcharts);

const Piechart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handlePointClick = (e) => {
    const drilldownId = e.point.series.userOptions.id;
    const seriesName = e.point.series.options.name;
    console.log(drilldownId);
    console.log(seriesName);

    if (!e.point.drilldown) {
      console.log("Navigating to", e.point.name);
      navigate(`/leads/${drilldownId}/${e.point.name}`);
      // navigate(`/leads/${e.point.series.userOptions.id}/${e.point.name}`);
    }
  };

  const options = {
    chart: {
      type: "pie",
      events: {
        drilldown: function (e) {
          console.log("Drilldown event", e);
        },
      },
    },
    title: {
      text: "Booking Details",
      align: "left",
    },
    subtitle: {
      text: 'Click the slices to view versions. Source: <a href="http://statcounter.com" target="_blank">statcounter.com</a>',
      align: "left",
    },
    accessibility: {
      announceNewData: {
        enabled: true,
      },
      point: {
        valueSuffix: "%",
      },
    },
    plotOptions: {
      series: {
        borderRadius: 5,
        dataLabels: [
          {
            enabled: true,
            distance: 20,
            format: "{point.name}",
          },
          {
            enabled: true,
            distance: "-30%",
            filter: {
              property: "percentage",
              operator: ">",
              value: 5,
            },
            format: "{point.y:.1f}%",
            style: {
              fontSize: "0.83em",
              textOutline: "none",
            },
          },
        ],
      },
      pie: {
        point: {
          events: {
            click: function (e) {
              if (this.series.userOptions.id) {
                handlePointClick(e);
              }
            },
          },
        },
      },
    },
    tooltip: {
      headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
      pointFormat:
        '<span style="color:{point.color}">{point.name}</span>: ' +
        "<b>{point.y:.2f}%</b> of total<br/>",
    },
    series: [
      {
        name: "Details",
        colorByPoint: true,
        data: mainChartData,
        // data: [
        //   {
        //     name: "Avana Unifeeder",
        //     y: 61.04,
        //     drilldown: "Avana Unifeeder",
        //   },
        //   {
        //     name: "ONE Line",
        //     y: 9.47,
        //     drilldown: "ONE Line",
        //   },
        //   {
        //     name: "MSC",
        //     y: 9.32,
        //     drilldown: "MSC",
        //   },
        //   {
        //     name: "Maersk",
        //     y: 8.15,
        //     drilldown: "Maersk",
        //   },
        //   {
        //     name: "Hapag Lloyd",
        //     y: 8.02,
        //     drilldown: "Hapag Lloyd",
        //   },
        //   {
        //     name: "CMA CGM",
        //     y: 4.0,
        //     drilldown: "CMA CGM",
        //   },
        // ],
      },
    ],
    drilldown: {
      series: drillDownData,
      // series: [
      //   {
      //     name: "Avana Unifeeder",
      //     id: "Avana Unifeeder",
      //     data: [
      //       ["Total", 36.89],
      //       ["Requested", 18.16],
      //       ["Cancelled", 2.54],
      //       ["Confirmed", 0.7],
      //       ["Completed", 20.8],
      //     ],
      //   },
      //   {
      //     name: "ONE Line",
      //     id: "ONE Line",
      //     data: [
      //       ["Total", 60.89],
      //       ["Requested", 7.16],
      //       ["Cancelled", 3.54],
      //       ["Confirmed", 6.7],
      //       ["Completed", 29.8],
      //     ],
      //   },
      //   {
      //     name: "MSC",
      //     id: "MSC",
      //     data: [
      //       ["Total", 23.89],
      //       ["Requested", 7.16],
      //       ["Cancelled", 1.54],
      //       ["Confirmed", 0.7],
      //       ["Completed", 20.8],
      //     ],
      //   },
      //   {
      //     name: "Maersk",
      //     id: "Maersk",
      //     data: [
      //       ["Total", 36.89],
      //       ["Requested", 12.16],
      //       ["Cancelled", 2.54],
      //       ["Confirmed", 0.7],
      //       ["Completed", 30.8],
      //     ],
      //   },
      //   {
      //     name: "Hapag Lloyd",
      //     id: "Hapag Lloyd",
      //     data: [
      //       ["Total", 39.89],
      //       ["Requested", 4.16],
      //       ["Cancelled", 7.54],
      //       ["Confirmed", 2.7],
      //       ["Completed", 15.8],
      //     ],
      //   },
      //   {
      //     name: "CMA CGM",
      //     id: "CMA CGM",
      //     data: [
      //       ["Total", 38.89],
      //       ["Requested", 19.16],
      //       ["Cancelled", 25.54],
      //       ["Confirmed", 0.7],
      //       ["Completed", 10.8],
      //     ],
      //   },
      // ],
    },
  };

  return (
    <>
      <HighchartsReact highcharts={Highcharts} options={options} />
      <Button variant="outline" onClick={() => setIsModalOpen(!isModalOpen)}>
        Table
      </Button>
      {isModalOpen && (
        <div className="flex justify-center md:items-center items-start overflow-auto fixed inset-0 bg-black bg-opacity-50">
          <div className="bg-white lg:p-6 p-2 rounded-lg md:max-w-lg max-w-full w-full shadow-lg">
            <div className="flex justify-end">
              <MdCancelPresentation
                onClick={() => setIsModalOpen(false)}
                className="text-lg text-red-600 cursor-pointer"
              />
            </div>
            <LeadTable />
          </div>
        </div>
      )}
    </>
  );
};

export default Piechart;

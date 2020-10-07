import React, { useContext } from 'react';
import { Graph } from 'react-d3-graph';
import { ObjectContext } from './ObjectContextProvider';

export default function GraphInterface(props) {
  const [objectListState, setObjectList, nodeObj, setNodeObj] = useContext(ObjectContext);
  // graph payload (with minimalist structure)
  const data = {
    nodes: objectListState.objects[0] ? getNodes() : [],
    links: objectListState.objects[0] ? getLinks() : []
  };
//   const data = {
//     nodes: [{
//       id: "Marvel",
//       svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/marvel.png",
//       size: 500,
//       fontSize: 18
//   },
//   {
//       id: "Heroes",
//       symbolType: "circle",
//       color: "red",
//       size: 300
//   },
//   {
//       id: "Villains",
//       symbolType: "circle",
//       color: "red",
//       size: 300
//   },
//   {
//       id: "Teams",
//       symbolType: "circle",
//       color: "red",
//       size: 300
//   },  
//   {
//     id: "Spider-Man",
//     name: "Peter Benjamin Parker",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_spiderman.png",
//     size: 400
// },
// {
//     id: "CAPTAIN MARVEL",
//     name: "Carol Danvers",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainmarvel.png",
//     size: 400
// },
// {
//     id: "HULK",
//     name: "Robert Bruce Banner",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_hulk.png",
//     size: 400
// },
// {
//     id: "Black Widow",
//     name: "Natasha Alianovna Romanova",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_blackwidow.png",
//     size: 400
// },
// {
//     id: "Daredevil",
//     name: "Matthew Michael Murdock",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_daredevil.png",
//     size: 400
// },
// {
//     id: "Wolverine",
//     name: "James Howlett",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_wolverine.png",
//     size: 400
// },
// {
//     id: "Captain America",
//     name: "Steven Rogers",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_captainamerica.png",
//     size: 400
// },
// {
//     id: "Iron Man",
//     name: "Tony Stark",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_ironman.png",
//     size: 400
// },
// {
//     id: "THOR",
//     name: "Thor Odinson",
//     svg: "http://marvel-force-chart.surge.sh/marvel_force_chart_img/top_thor.png",
//     size: 400
// }],
//     links: [{
//       source: "Marvel",
//       target: "Heroes"
//   },
//   {
//       source: "Marvel",
//       target: "Villains"
//   },
//   {
//       source: "Marvel",
//       target: "Teams"
//   },
//   {
//     source: "Heroes",
//     target: "Spider-Man"
// },
// {
//     source: "Heroes",
//     target: "CAPTAIN MARVEL"
// },
// {
//     source: "Heroes",
//     target: "HULK"
// },
// {
//     source: "Heroes",
//     target: "Black Widow"
// },
// {
//     source: "Heroes",
//     target: "Daredevil"
// },
// {
//     source: "Heroes",
//     target: "Wolverine"
// },
// {
//     source: "Heroes",
//     target: "Captain America"
// },
// {
//     source: "Heroes",
//     target: "Iron Man"
// },
// {
//     source: "Heroes",
//     target: "THOR"
// }]
//   }
  console.log("this is our data", data)


  function getNodes() {
    const nodes = [];
    for (let i = 0; i < objectListState.objects.length; i += 1) {
      nodes.push({id: objectListState.objects[i].objectName});
      for (let j = 0; j < objectListState.objects[i].fields.length; j += 1) {
        nodes.push({id: objectListState.objects[i].fields[j].fieldName})
      }
    }
    return nodes;
  }

  function getLinks() {
    const links = [];
    for (let i = 0; i < objectListState.objects.length; i += 1) {
      for (let j = 0; j < objectListState.objects[i].fields.length; j += 1) {
        links.push({source: objectListState.objects[i].objectName, target: objectListState.objects[i].fields[j].fieldName,})
      }
    }
    return links;
  }

  // the graph configuration, you only need to pass down properties
  // that you want to override, otherwise default ones will be used
  const myConfig = {
    directed: true,
    automaticRearrangeAfterDropNode: true,
    collapsible: true,
    height: 400,
    highlightDegree: 2,
    highlightOpacity: 0.2,
    linkHighlightBehavior: true,
    maxZoom: 12,
    minZoom: 0.05,
    nodeHighlightBehavior: true,
    panAndZoom: false,
    staticGraph: false,
    width: 800,
    d3: {
        alphaTarget: 0.05,
        gravity: -250,
        linkLength: 120,
        linkStrength: 2,
    },
    node: {
        color: "#d3d3d3",
        fontColor: "black",
        fontSize: 10,
        fontWeight: "normal",
        highlightColor: "red",
        highlightFontSize: 14,
        highlightFontWeight: "bold",
        highlightStrokeColor: "red",
        highlightStrokeWidth: 1.5,
        mouseCursor: "crosshair",
        opacity: 0.9,
        renderLabel: true,
        size: 200,
        strokeColor: "none",
        strokeWidth: 1.5,
        svg: "",
        symbolType: "circle",
        viewGenerator: null,
    },
    link: {
        color: "lightgray",
        highlightColor: "red",
        mouseCursor: "pointer",
        opacity: 1,
        semanticStrokeWidth: true,
        strokeWidth: 3,
        type: "STRAIGHT",
    }
  };

  // // graph event callbacks
  // const onClickGraph = function () {
  //   window.alert(`Clicked the graph background`);
  // };

  // Onclick, generate a new objectTypeForm with current Node's objectName and fields
  const onClickNode = function (nodeId) {
    // setNodeObj({});
    // Grab object with state corresponding to node clicked
    const currentObj = objectListState.objects.filter(obj => obj.objectName === nodeId);
    console.log('current object:', currentObj);
    // Changes current node object in global state
    currentObj[0] ? setNodeObj(currentObj[0]):null;
  };

  // const onDoubleClickNode = function (nodeId) {
  //   window.alert(`Double clicked node ${nodeId}`);
  // };

  // const onRightClickNode = function (event, nodeId) {
  //   window.alert(`Right clicked node ${nodeId}`);
  // };

  // const onMouseOverNode = function (nodeId) {
  //   window.alert(`Mouse over node ${nodeId}`);
  // };

  // const onMouseOutNode = function (nodeId) {
  //   window.alert(`Mouse out node ${nodeId}`);
  // };

  // const onClickLink = function (source, target) {
  //   window.alert(`Clicked link between ${source} and ${target}`);
  // };

  // const onRightClickLink = function (event, source, target) {
  //   window.alert(`Right clicked link between ${source} and ${target}`);
  // };

  // const onMouseOverLink = function (source, target) {
  //   window.alert(`Mouse over in link between ${source} and ${target}`);
  // };

  // const onMouseOutLink = function (source, target) {
  //   window.alert(`Mouse out link between ${source} and ${target}`);
  // };

  const onNodePositionChange = function (nodeId, x, y) {
    console.log(
      `Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`
    );
  };

  // If we haven't added any object types yet, dont render the graph
  if (objectListState.objects[0]) {
    return (
      <Graph
        id='graph-id' // id is mandatory, if no id is defined rd3g will throw an error
        data={data}
        config={myConfig}
        onClickNode={onClickNode}
        // onDoubleClickNode={onDoubleClickNode}
        // onRightClickNode={onRightClickNode}
        // onClickGraph={onClickGraph}
        // onClickLink={onClickLink}
        // onRightClickLink={onRightClickLink}
        // onMouseOverNode={onMouseOverNode}
        // onMouseOutNode={onMouseOutNode}
        // onMouseOverLink={onMouseOverLink}
        // onMouseOutLink={onMouseOutLink}
        onNodePositionChange={onNodePositionChange}
      />
    );
  } else {
    return (
      <div>Get Started</div>
    )
  }
}
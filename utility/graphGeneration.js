import Line from "../components/Line";
import Vertex from "../components/Vertex";

function graphGeneration(list, n, radius, xCenter, yCenter, handleClick) {
    let vertexList = list[0]
    let lineList = list[1]
    let angles = n
    for (let i=0; i<angles; i++)
    {
        let angle = 2 * Math.PI / angles * i
        vertexList.push({
            'x': xCenter + Math.cos(angle)*radius,
            'y': yCenter + Math.sin(angle)*radius,
            'vertex': <Vertex x = {xCenter + Math.cos(angle)*radius} y = {yCenter + Math.sin(angle)*radius} key = {i+1}/>,
            'index' : i
        })
    }

    let lineIndex = 0
    let angles2 = n
    for(let i=0; i<angles-1; i++)
    {
        for(let j=0; j<angles2-1; j++)
        {
            lineList.push({
                'x1': vertexList[vertexList.length - j-1].x,
                'y1': vertexList[vertexList.length - j-1].y,
                'x2': vertexList[i].x,
                'y2': vertexList[i].y,
                'line': <Line x1={vertexList[vertexList.length - j-1].x} y1={vertexList[vertexList.length - j-1].y} x2={vertexList[i].x} y2={vertexList[i].y}
                              onClick = {handleClick} vertex1 = {vertexList[vertexList.length - j-1]} vertex2 = {vertexList[i]} color={"gray"} index = {lineIndex}/>,

                'color': "gray",
                'vertex1': vertexList[vertexList.length - j-1],
                'vertex2': vertexList[i]
            })
            lineIndex++
        }
        angles2 = angles2-1
    }


}


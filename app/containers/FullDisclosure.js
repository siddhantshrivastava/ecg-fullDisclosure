import React, { Component } from 'react';
import { getPlotData } from './getPlotData';
import * as d3 from "d3";

export default class FullDisclosure extends Component {

    componentDidMount() {
        this.chunking();
        this.draw();

    }

    chunking() {
        Object.defineProperty(Array.prototype, 'chunk', {
            value: function (chunkSize) {
                console.log("hiiiiiii")
                var temporal = [];

                for (var i = 0; i < this.length; i += chunkSize) {
                    temporal.push(this.slice(i, i + chunkSize));
                }
                console.log("121212121",temporal)
                return temporal;
            }
        });
    }

    draw() {
        getPlotData('a1cac9de-806c-439f-95e9-5e7a31fbfddc', this.props.basePath).then((dataSet) => {
            console.log(dataSet)
            let data = dataSet.chunk(15000)
            console.log(data)
            const width = 1475,
                height = 900;
            const graphContainer = d3.select(".full-disclosure").append("svg").attr("class", "viewer2").attr("width", 1475).attr("height", 900),
                g = graphContainer.append("g").attr("class", "graph").attr("width", width).attr("height", height);

            const x = d3.scaleLinear()
                .domain([0, 1500])
                .range([0,70]);

            const y = d3.scaleLinear()
                .domain([-1,1 ])
                .range([150, 0]);

            // g.append("g")
            //   .attr("transform", "translate(0," + height + ")")
            //   .call(d3.axisBottom(x));

            // g.append("g")
            //   .attr("class", "axis axis--y")
            //   .call(d3.axisLeft(y));

            const line = d3.line()
                .x(function (d, i) {
                    return x(d[0]);
                })
                .y(function (d, i) {
                    return y(d[1])
                })

            const numberOfGraph = 12;
            let ytranslate = 0;

            const translate = (d, i) => {
                if (i > 0) { ytranslate += height / numberOfGraph; }
                return `translate(0,${-height + ytranslate})`;
            }

            g.selectAll("lineUsers2")
                .data(data.slice(0, numberOfGraph))
                .enter().append("path")
                .attr("class", "lineUsers2")
                
                .transition()
                .duration(750)
                .attr("d", line);
        }).catch((err)=>{
        console.log("error ",err)
        });
    }

    render() {
        return (
            <div className="full-disclosure" style={{"overflow": "auto","maxHeight":"600px", "width":"1500px"}}>
            </div>
        )
    }
}

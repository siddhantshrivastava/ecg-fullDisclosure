//jshint ignore : start

import React, { Component } from "react";
import * as d3 from "d3";
import {getPlotData} from './getPlotData';
export default class ViewerPage extends Component {

  componentWillMount() {
    this.Draw();
  }

  Draw = () => {
  getPlotData('a1cac9de-806c-439f-95e9-5e7a31fbfddc',this.props.basePath).then((data) => {
      const graphContainer = d3.select(".viewer1")
      //creating an array containing plotting points for x-axis grid lines
      let xDomainMax = d3.max(data, function (d, i) {
        return d3.max(d, (t, i) => {
          if (i === 0)
            return t;
        });
      });
      let xgrid = [...Array(Math.ceil(xDomainMax / 40 + 1)).keys()].map((i) => i * 40);

      //creating an array containing plotting points for y-axis grid lines
      let yDomainMax = d3.max(data, function (d, i) {
        return d3.max(d, (t, i) => {
          if (i > 0)
            return t;
        });
      });
      let yDomainMin = d3.min(data, function (d, i) {
        return d3.min(d, (t, i) => {
          if (i > 0)
            return t;
        });
      });
      let ymax = yDomainMax > Math.abs(yDomainMin) ? Math.ceil(yDomainMax) : Math.ceil(Math.abs(yDomainMin));
      let ymin = -ymax;
      let ygrid = [];
      for (let i = ymin; i <= ymax; i = Number((i + 0.1).toFixed(1))) {
        ygrid.push(i)
      }
      //Dimension of graph
      const width = (xDomainMax * 3.2 / 40)*4,
        height = ymax * 2 * 3.2 * 10*4;

      const g = graphContainer.append("g").attr("width", width).attr("height", height);

      graphContainer.call(d3.zoom().on('zoom', function () { g.attr("transform", d3.event.transform) }))
      
      const x = d3.scaleLinear()
        .domain([0, xDomainMax])
        .range([0, width]);

      const y = d3.scaleLinear()
        .domain([-ymax, ymax])
        .range([height, 0]);

      const make_x_grid_lines = () => {
        return d3.axisBottom(x)
          .tickValues(xgrid)
      }

      const make_y_gridlines = () => {
        return d3.axisLeft(y)
          .tickValues(ygrid)
      }

      const lineCount = d3.line()
        .x(function (d) { return x(d[0]); })
        .y(function (d) { return y(d[1]); })

      g.append("g")
        .attr("class", `grid`)
        .attr("transform", "translate(0," + height + ")")
        .call(make_x_grid_lines()
          .tickSize(-height)
          .tickFormat(""));

      g.append("g")
        .attr("class", `grid`)
        .call(make_y_gridlines()
          .tickSize(-width)
          .tickFormat(""));

      g.append("path")
        .datum(data)
        .attr("class", "lineUsers")
        .attr("d", lineCount);
    }).catch((err) => {
      console.log(err)
    })
  }

  render() {
    return (
     <svg className="viewer1" width="1475" height="256"/>
    )
  }
}
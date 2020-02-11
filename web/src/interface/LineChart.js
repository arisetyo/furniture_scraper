/**
 * @author: Arie M. Prasetyo (2020)
 */
import React, {Component, Fragment} from 'react';
import * as d3 from 'd3';
import styles from './LineChart.css';

/**
 * Line chart
 * An SVG line chart using D3
 */
export class LineChart extends Component {
	constructor(props) {
		super(props);

		/**
		 * Default size for this chart is 500 x 500 pixels
		 * The data must be extrapolated to this size.
		 * Transform value for the group is 32 pixels.
		 * */
		this.dim = {
			w: 800,
			h: 500,
			t: 54
		};

		this.xAxis = null;
		this.yAxis = null;

		this.state = {
			lineData: null,
			chartData: null,
			toolTip: null
		};
	}

	componentDidMount() {
		const {data} = this.props;
		this.draw(data);

		this.setAxis();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.data !== this.props.data) this.setAxis();
	}

  setAxis = () => {
		d3.select(this.xAxisRef).call(this.xAxis);
		d3.select(this.yAxisRef).call(this.yAxis);
		d3.select(this.xAxisGridRef).call(this.xAxisGrid);
		d3.select(this.yAxisGridRef).call(this.yAxisGrid);
  }

	/** 
	 * main draw method 
	 * @param data 		array of integer values
	 */
	draw(data) {
		if (data.length <= 1) throw new Error('a minimum of two data points is needed');

		/**
		 * 1.
		 * Prepare data domain and range
		 * to make sure the data fits the dimension of the chart.
		 * */
		
		const xConverter = d3
			.scaleLinear()
			.domain([0, data.length - 1])
			.range([0, this.dim.w]);

		const biggestValue = [...data].sort((a, b) => b - a)[0];
		const yConverter = d3
			.scaleLinear()
			.domain([biggestValue.price + 500000, 0])
			.range([0, this.dim.h]);

		/**
		 * 2.
		 * Convert data based on the scale converters.
		 * Create an array of {x, y} objects.
		 * */
		const chartData = data.map((d, i) => (
			{
				x: xConverter(i),
				y: yConverter(d.price),
				value: d.price,
				time: d.time
			}
		));

		/**
		 * 3.
		 * Create the SVG path data
		 * for the data visualization
		 * */
		const lineGenerator = d3
			.line()
			.x(d => d.x)
			.y(d => d.y)
			.curve(d3.curveMonotoneX);

		const lineData = lineGenerator(chartData);

		this.setState({
			lineData,
			chartData
		});

		// CREATE SCALE BASED ON X/Y SCALES
		this.xAxis = d3
			.axisBottom()
			.scale(xConverter)
			.ticks(5);
		this.yAxis = d3
			.axisLeft()
			.scale(yConverter)
			.ticks(5);

		this.xAxisGrid = d3
			.axisBottom()
			.scale(xConverter)
			.ticks(10)
			.tickSize(-this.dim.h)
			.tickFormat('');
		this.yAxisGrid = d3
			.axisLeft()
			.scale(yConverter)
			.ticks(10)
			.tickSize(-this.dim.w)
			.tickFormat('');
	}

	showToolTip = (x, y, d, t) => {
		const date = new Date(t);
		const toolTip = (
			<Fragment>
				<rect
					width="94"
					height="30"
					fill="#385273"
					x={x - 36}
					y={y - 36}
					rx={3}
					ry={3}/>
				<text
					x={x - 30}
					y={y - 24}
					fill="#FFFFFF"
					font-size="10">
					{`Rp${new Intl.NumberFormat('id').format(d)}`}
				</text>
				<text
					x={x - 30}
					y={y - 12}
					fill="#FFFFFF"
					font-size="10">
					{date.toLocaleDateString('id', {day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'})}
				</text>
			</Fragment>
		);
		this.setState({toolTip});
	}

	render() {
		const {lineData, chartData, toolTip} = this.state;

		return (
			<div class={styles.LineChart}>

				<svg xmlns="http://www.w3.org/2000/svg"
					width={this.dim.w + (2 * this.dim.t) + 40}
					height={this.dim.h + (2 * this.dim.t)}>

					<g transform={`translate(${this.dim.t + 40}, ${this.dim.t})`}>

						<path
							d={lineData}
							stroke={'#BF4904'}
							fill={'none'}
							strokeWidth={4}/>

						{
							chartData && chartData.map((d, i) => (
								<circle
									cx={d.x}
									cy={d.y}
									fill="#385273"
									stroke="none"
									onMouseOver={e => this.showToolTip(d.x, d.y, d.value, d.time)}>
									<animate
										attributeName="r"
										from="0"
										to="6"
										dur=".5s"
										repeatCount="1"
										fill="freeze"/>
									<animate
										attributeName="opacity"
										from="0"
										to="1"
										dur=".5s"
										repeatCount="1"
										fill="freeze"/>
								</circle>
							))
						}

						{toolTip}

						<g
							class={styles.grid}
							ref={el => this.xAxisGridRef = el}
							stroke-dasharray='1 2'
							transform={`translate(0, ${this.dim.h})`}/>
						<g
							class={styles.grid}
							ref={el => this.yAxisGridRef = el}
							stroke-dasharray='1 2'
							transform={`translate(0, 0)`}/>

						<g
							ref={el => this.xAxisRef = el}
							transform={`translate(0, ${this.dim.h})`}/>
						<g
							ref={el => this.yAxisRef = el}
							transform={`translate(0, 0)`}/>

					</g>						

				</svg>

			</div>
		);
	}
}

export default LineChart;

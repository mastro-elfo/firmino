import React, {Component, Fragment} from 'react';
import {withRouter} from 'react-router-dom';

import {withStyles} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';

import {prefix} from 'prefix-si';

import Add from '@material-ui/icons/AddBox';
import ArrowUpward from '@material-ui/icons/ArrowUpward';

// function ev (e) {
// 	console.log(
// 		window.scrollY,
// 		window.innerHeight,
// 		document.body.scrollHeight,
// 		document.body.offsetHeight,
// 		document.documentElement.clientHeight,
// 		document.documentElement.scrollHeight,
// 		document.documentElement.offsetHeight
// 	);
// }
// window.removeEventListener('scroll', ev);
// window.addEventListener('scroll', ev);

class SearchResult extends Component {
	state = {
		resultLimit: 0,
		scrollY: 0
	}

	constructor(props){
		super(props);
		this.state.resultLimit = +props.limit;
	}

	componentDidMount(){
		window.addEventListener('scroll', this.handleScroll);
		window.addEventListener('wheel', this.handleWheel);
	}

	componentWillUnmount(){
		window.removeEventListener('scroll', this.handleScroll);
		window.removeEventListener('wheel', this.handleWheel);
		clearTimeout(this.timeout);
	}

	componentDidUpdate(prevProps){
		if(prevProps.search !== this.props.search){
			this.setState({resultLimit: +this.props.limit});
		}
	}

	handleScroll = (e) => {
		this.setState({
			scrollY: window.scrollY
		});
	}

	handleWheel = ({deltaY}) => {
		if(deltaY > 0) {
			const max = Math.max(
				document.body.scrollHeight,
				document.body.offsetHeight,
				document.documentElement.clientHeight,
				document.documentElement.scrollHeight,
				document.documentElement.offsetHeight);

			if(!this.timeout
				&& this.props.result.length > this.state.resultLimit
				&& window.scrollY +window.innerHeight >= max -128) {
				this.setState({
					resultLimit: this.state.resultLimit + (+this.props.limit)
				});
				this.timeout = setTimeout(() => {
					this.timeout = null;
				}, 250);
			}
		}
	}

	render(){
		const {search, time, result, limit, history: {push}, classes} = this.props;
		const {resultLimit, scrollY} = this.state;

		return (
			<Fragment>
				<List
					subheader={(
						!!search &&
						<ListSubheader
							className={classes.ListSubheader}>
							{result.length} {result.length === 1 ? 'risultato' : 'risultati'} in {prefix(time /1000, 's')}
						</ListSubheader>
					)}>
					{
						result.slice(0, resultLimit).map((item, i) => (
							<ListItem
								key={i}
								button
								onClick={()=>{push(item.link)}}>
								{
									item.icon &&
									<ListItemIcon>
										{item.icon}
									</ListItemIcon>
								}
								<ListItemText
									primary={item.primary}
									secondary={item.secondary}/>
								{
									item.secondaryIcon &&
									<ListItemIcon>
										{item.secondaryIcon}
									</ListItemIcon>
								}
							</ListItem>
						))
					}
					{
						result.length > resultLimit &&
						<ListItem
							button
							onClick={this.handleShowMore}>
							<ListItemIcon>
								<Add color="secondary"/>
							</ListItemIcon>
							<ListItemText
								primary="Mostra altri"/>
						</ListItem>
					}
				</List>
				<Zoom
					unmountOnExit
					in={scrollY > 64}>
					<Fab
						color="secondary"
						className={classes.Fab}
						onClick={this.handleScrollToTop}>
						<ArrowUpward/>
					</Fab>
				</Zoom>
			</Fragment>
		);
	}

	handleShowMore = () => {
		const {limit} = this.props;
		const {resultLimit} = this.state;
		this.setState({resultLimit: resultLimit +(+limit)});
	}

	handleScrollToTop = () => {
		window.scroll(0, 0);
	}
}

SearchResult.defaultProps = {
	time: 0,
	result: [],
	search: '',
	limit: 5
};

const styles = theme => ({
	ListSubheader: {
		background: 'white'
	},
	Fab: {
		position: 'fixed',
		bottom: theme.spacing.unit *2,
		right: theme.spacing.unit *2
	}
});

export default withRouter(withStyles(styles)(SearchResult));

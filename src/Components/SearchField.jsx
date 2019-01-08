import React, {Component} from 'react';

import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';

import Search from '@material-ui/icons/Search';
import Cancel from '@material-ui/icons/Cancel';

class SearchField extends Component {
	state = {
		search: ''
	}

	componentWillUnmount(){
		clearTimeout(this.delay);
	}

	render(){
		const {loading, classes, onSearch, ...TextFieldProps} = this.props;
		const {search} = this.state;

		return (
			<TextField
				{...TextFieldProps}
				value={search}
				onChange={this.handleChange}
				InputProps={{
					startAdornment:(
						<InputAdornment
							position="start">
							<IconButton
								title=""
								disabled={!search}
								onClick={this.handleSearch}>
								<Search/>
								{
									loading &&
									<CircularProgress
										color="primary"
										className={classes.Absolute}/>
								}
							</IconButton>
						</InputAdornment>
					),
					endAdornment:(
						<InputAdornment
							position="end">
							{
								!!search &&
								<IconButton
									title=""
									onClick={this.handleCancel}>
									<Cancel/>
								</IconButton>
							}
						</InputAdornment>
					)
				}}/>
		);
	}

	handleChange = ({target: {value}}) => {
		this.setState({
			search: value
		});
		clearTimeout(this.delay);
		this.delay = setTimeout(()=>{
			this.props.onSearch(value);
		}, 250);
	}

	handleCancel = () => {
		this.setState({search: ''});
		clearTimeout(this.delay);
		this.props.onSearch('');
	}

	handleSearch = () => {
		clearTimeout(this.delay);
		this.props.onSearch(this.state.search);
	}
}

// SearchField.defaultProps = {
// 	onSearch: ()=>{console.error('onSearch not defined')},
// 	delay: 300,
// 	loading: false
// }

const styles = theme => ({
	Absolute: {
		position: 'absolute'
	}
});

export default withStyles(styles)(SearchField);

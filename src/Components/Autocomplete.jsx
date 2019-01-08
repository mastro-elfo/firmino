import React, { Component } from 'react';

import keycode from 'keycode';
import Downshift from 'downshift';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

import Cancel from '@material-ui/icons/Cancel';
import AddCircle from '@material-ui/icons/AddCircle';

/*
<Autocomplete
	TextFieldProps={{
		fullWidth: true,
		label: "Seleziona..."
	}}
	suggestions={[]}
	onChange={(selected)=>console.info('Selected', selected)}
	multiple={false}/>
<Autocomplete
	TextFieldProps={{
		fullWidth: true,
		label: "Seleziona..."
	}}
	suggestions={[]}
	selected={[]}
	onChange={(selected)=>console.info('Selected', selected)}
	multiple={true}/>
 */

function Autocomplete(props) {
  const { multiple, ...other } = props;
  if (multiple) {
    return <Multiple {...other} />;
  } else {
    return <Single {...other} />;
  }
}

const styles = theme => ({
  container: {
    flexGrow: 1,
    position: 'relative',
  },
  paper: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1,
  },
  InputRoot: {
    flexWrap: 'wrap',
  },
  InputInput: {
    width: 'auto',
    flexGrow: 1,
  },
  Chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
});

export default withStyles(styles)(Autocomplete);

function Single(props) {
  const {
    classes,
    suggestions,
    selected,
    onChange,
    TextFieldProps,
    itemToString,
    onClickAdd,
  } = props;
  return (
    <Downshift onChange={onChange} itemToString={itemToString} initialSelectedItem={selected}>
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        highlightedIndex,
        inputValue,
        isOpen,
        selectedItem,
        clearSelection,
      }) => (
        <div className={classes.container}>
          {renderInput({
            ...TextFieldProps,
            InputProps: getInputProps({
              value: inputValue || '',
            }),
            clearSelection,
            selectedItem,
            onClickAdd,
          })}

          {isOpen && (
            <Paper className={classes.paper}>
              {getSuggestions({ suggestions, inputValue, itemToString }).map((suggestion, index) =>
                renderSuggestion({
                  suggestion,
                  index,
                  highlightedIndex,
                  inputValue,
                  itemProps: getItemProps({ item: suggestion }),
                  itemToString,
                }),
              )}
            </Paper>
          )}
        </div>
      )}
    </Downshift>
  );
}

class Multiple extends Component {
  state = {
    inputValue: '',
    selectedItem: [],
  };

  constructor(props) {
    super(props);
    this.state.selectedItem = props.selected;
  }

  render() {
    const { classes, suggestions, selected, TextFieldProps, itemToString, onClickAdd } = this.props;
    const { inputValue, selectedItem } = this.state;

    return (
      <Downshift
        onChange={this.handleChange}
        itemToString={itemToString}
        selectedItem={selectedItem}
        inputValue={inputValue}
        initialSelectedItem={selected}
      >
        {({
          getInputProps,
          getItemProps,
          isOpen,
          inputValue: inputValue2,
          selectedItem: selectedItem2,
          highlightedIndex,
        }) => (
          <div className={classes.container}>
            {renderInput({
              ...TextFieldProps,
              InputProps: getInputProps({
                classes: {
                  root: classes.InputRoot,
                  input: classes.InputInput,
                },
                startAdornment: selectedItem.map(item => (
                  <Chip
                    key={item.id}
                    tabIndex={-1}
                    className={classes.Chip}
                    label={itemToString(item)}
                    onDelete={this.handleDelete(item)}
                  />
                )),
                onChange: this.handleInputChange,
                onKeyDown: this.handleKeyDown,
              }),
              onClickAdd,
            })}
            {isOpen && (
              <Paper className={classes.paper}>
                {getSuggestions({
                  suggestions,
                  inputValue: inputValue2,
                  selected,
                  itemToString,
                }).map((suggestion, index) =>
                  renderSuggestion({
                    suggestion,
                    index,
                    highlightedIndex,
                    inputValue,
                    itemProps: getItemProps({ item: suggestion }),
                    itemToString,
                  }),
                )}
              </Paper>
            )}
          </div>
        )}
      </Downshift>
    );
  }

  handleChange = item => {
    const { onChange } = this.props;
    const { selectedItem } = this.state;
    selectedItem.push(item);
    this.setState({
      inputValue: '',
      selectedItem,
    });
    onChange(selectedItem);
  };

  handleInputChange = ({ target: { value } }) => {
    this.setState({
      inputValue: value,
    });
  };

  handleKeyDown = event => {
    const { inputValue, selectedItem } = this.state;
    if (selectedItem.length && !inputValue.length && keycode(event) === 'backspace') {
      // Something is selected
      // input is empty
      // pressed 'backspace'
      this.setState({
        selectedItem: selectedItem.slice(0, selectedItem.length - 1),
      });
    }
  };

  handleDelete = item => () => {
    const { onChange } = this.props;
    const { selectedItem } = this.state;
    const index = selectedItem.findIndex(({ id }) => id === item.id);
    if (index !== -1) {
      selectedItem.splice(index, 1);
      this.setState({
        inputValue: '',
        selectedItem,
      });
      onChange(selectedItem);
    }
  };
}

function renderInput(props) {
  const { InputProps, ref, selectedItem, clearSelection, onClickAdd, ...TextFieldProps } = props;

  let endAdornment = <span />;
  if (clearSelection && selectedItem) {
    endAdornment = (
      <IconButton title="Cancella" onClick={clearSelection} tabIndex={-1}>
        <Cancel />
      </IconButton>
    );
  } else if (onClickAdd && InputProps.value) {
    endAdornment = (
      <IconButton title="Nuovo" onClick={() => onClickAdd(InputProps.value)} tabIndex={-1}>
        <AddCircle />
      </IconButton>
    );
  }

  return (
    <TextField
      InputProps={{
        inputRef: ref,
        ...InputProps,
        endAdornment: <InputAdornment position="end">{endAdornment}</InputAdornment>,
      }}
      {...TextFieldProps}
    />
  );
}

function getSuggestions({ suggestions, inputValue, selected, itemToString }) {
  selected = selected ? selected : [];
  return suggestions
    .filter(({ id }) => selected.findIndex(item => item.id === id) === -1)
    .filter(item => match(item.search, inputValue).length);
  // .filter(item => match(itemToString(item), inputValue).length);
}

function renderSuggestion({
  suggestion,
  index,
  highlightedIndex,
  itemProps,
  inputValue,
  itemToString,
}) {
  const isHighlighted = highlightedIndex === index;
  const label = itemToString(suggestion);
  const parts = parse(label, match(label, inputValue));
  return (
    <MenuItem
      {...itemProps}
      key={suggestion.id}
      selected={isHighlighted}
      style={{ whiteSpace: 'pre' }}
      component="div"
    >
      {parts.map((item, i) =>
        item.highlight ? <strong key={i}>{item.text}</strong> : <span key={i}>{item.text}</span>,
      )}
    </MenuItem>
  );
}

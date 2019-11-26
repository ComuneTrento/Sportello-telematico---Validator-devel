import { connect } from 'react-redux';
import { setQueryFilter } from '../actions';
import ModuleList from '../components/ModuleList.js';

import fuzzysort from "fuzzysort";

const getFilteredModules = (modules, query) => {
    if (query === "") {
        return {};
    }

    var options = {
      limit: 30,
      threshold: -10000, // don't return bad results
      keys: ['file_path', 'folders_search', 'urn', 'code'],
    };

    const results = fuzzysort.go(query, modules, options);

    return results.map(result => result.obj.key);
}

const mapStateToProps = state => {
    return {
        modules: getFilteredModules(state.modules, state.queryFilter),
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchCange: query => {
            dispatch(setQueryFilter(query))
        }
    };
}

const FilteredModuleList = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleList)

export default FilteredModuleList;

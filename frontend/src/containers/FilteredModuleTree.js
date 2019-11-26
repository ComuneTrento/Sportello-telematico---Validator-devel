import { connect } from 'react-redux';
import { ModuleTree } from '../components/ModuleTree.js';



const mapStateToProps = state => {
    return {
        modules: state.modules,
    }
}

const mapDispatchToProps = dispatch => {
    return {};
}

const FilteredModuleTree = connect(
    mapStateToProps,
    mapDispatchToProps
)(ModuleTree)

export default FilteredModuleTree;

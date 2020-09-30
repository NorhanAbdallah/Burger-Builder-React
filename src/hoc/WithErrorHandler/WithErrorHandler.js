import React from 'react'
import Aux from '../Aux'
import Modal from '../../Components/UI/Modal/Modal'


const WithErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }
        componentWillMount = () => {
            this.resInterceptors = axios.interceptors.response.use(null, error => {
                this.setState(
                    {
                        error: error
                    }
                )
            })
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null })
                return req
            })
        }

        componentWillUnmount = () => {
            axios.interceptors.response.eject(this.resInterceptors)
            axios.interceptors.request.eject(this.reqInterceptors)
        }



        close = () => {
            this.setState({
                error: null
            })
        }
        render() {
            return (
                <Aux>
                    <Modal
                        show={this.state.error}
                        close={this.close}>
                        something went wrong!
                   </Modal>
                    <WrappedComponent {...this.props} />
                </Aux >

            )
        }

    }
}
export default WithErrorHandler;
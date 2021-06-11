import React from 'react'
import { modalAction } from '../actions/modalAction'
import { useDispatch, useSelector } from 'react-redux'
import { utils } from 'ethers'

const StakeAdder = (props) =>{

    console.log(props)
    const dispatch = useDispatch();
    const selector = useSelector((state) => state.modalReducer.title)
    const close = () =>{
        dispatch(modalAction(false, selector))
    }

    return(
        <div className="card-shadow">
            <div className="stake-adder-card">
                <div className="stake-header">
                    <p>Stake {props.tokenName}</p>
                    <p onClick={close}>x</p>
                </div>
                <div className="balance">
                    <p>Balance in wallet: {utils.commify(props.walletBalance)}</p>
                </div>
                <div className="add-on">
                    <div className="input-value">
                    <input type="text" placeholder={"Enter "+props.title+" amount"} value={props.walletAmount} onChange={(e) => props.updateWalletAmount(e.target.value)} />
                    </div>
                    <input type="submit" value="MAX" onClick={() => props.updateWalletAmount(props.walletBalance)}/>
                    <div className="stake-type">
                        <img src={props.logo} alt="" />
                        <p>{props.title}</p>
                    </div>
                </div>
                <div className="button-stake">
                    {props.walletAmount ===  0 || props.walletAmount === '0' ? <button disabled>Stake</button> : <button onClick={props.checkAndStakeSSGT}>Stake</button>}
                    <button>Buy {props.title}</button>
                </div>
            </div>
        </div>
    )
}
export default StakeAdder;
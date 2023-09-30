import React from 'react'
import './education.css'

const Education = () => {
    return (
        <div className="education">
            <div className="h4">Education</div>
            <div className="edufield">
                <div className="edulogo">
                    <img src="/ext.png" alt="" />
                </div>
                <div className="eduinfo">
                    <div className="title">Moscow State Linguistic University</div>
                    <div className="degree">
                        Bachelor's degree Field Of StudyComputer and Information Systems Security/Information Assurance
                    </div>
                    <div className="year">2013 — 2017</div>
                    <div className="courses">Additional English classes and UX profile courses​.</div>
                </div>
            </div>
        </div>
    )
}

export default Education
import React from 'react'
import { Like, Comments } from 'react-facebook';


const FbComments = ({ fbHref }) => {

    return (
        <section className="overflow-hidden mt4" >
            <table className="w-100">
                <tbody>
                    <tr>
                        <td className="pl2">
                            <Like 
                                href={fbHref} 
                                lazy={true} 
                                colorScheme="light" 
                                size="large" 
                                width="90" 
                                button_count 
                                showFaces 
                                share 
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className="mv3">
                            <Comments href={fbHref} lazy={true} colorScheme="light" width="100%" />
                        </td>
                    </tr>
                </tbody>
            </table>
        </section>
    )
}

export default FbComments

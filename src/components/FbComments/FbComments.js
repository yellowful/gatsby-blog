import React from 'react'
import { Like, Comments } from 'react-facebook';

//用來放fb comments
const FbComments = ({ fbHref }) => {
//fb常有錯誤，會產生width超大的空白，所以要設定overflow-hidden
    return (
        <section className="overflow-hidden mt4" >
            <table className="w-100">
                <tbody>
                    <tr key="fb-table-row1">
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
                    <tr key="fb-table-row2">
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

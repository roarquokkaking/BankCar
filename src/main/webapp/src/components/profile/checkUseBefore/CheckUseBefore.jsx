import React, {useEffect, useState} from 'react';
import { GoArrowLeft } from 'react-icons/go';
import {useNavigate, useParams} from 'react-router-dom';
import ComponentHeader from '../ComponentsHeader';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CheckUseBeforeCard from "./CheckUseBeforeCard";
import styles from "./CheckUseBefore.module.css";
import {useSelector} from "react-redux";
import axios from "axios";
import useBefore from "../UseBefore";
import data from "bootstrap/js/src/dom/data";
// import {selectUserCarList} from "../../register/api/CarApiService"; // Axios 호출 주석 처리

const dummy_cars = [
    { carId: 1,doro:'강남',rating:1,  category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment: "대형", doro_address: "테헤란로", title: "제목 입니다.", content: "내용asdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsaddfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsaddfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsaddfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsaddfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsaddfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfasfasdfasdfsadfsadfasdfasdfsadfsadfasdfasdfsadfsadfas 입니다.", startTime: '2024-06-13 09:00', endTime: '2024-06-13 18:00', username: '조나단', phone: '123-456-7891', imageUrl: 'data:image/jpeg;base64,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' },
    { carId: 2, doro:'강남',rating:1,category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment: "대형", doro_address: "테헤란로", title: "제목 입니다.", content: "내용 입니다.", startTime: '2024-06-13 09:00', endTime: '2024-06-13 18:00', username: 'Jane Doe', phone: '123-456-7891', imageUrl: 'data:image/jpeg;base64,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' },
    { carId: 3,doro:'강남',rating:1, category: '캠핑', model: '제네시스', released: '2023', color: '블랙', segment: "대형", doro_address: "테헤란로", title: "제목 입니다.", content: "내용 입니다.", startTime: '2024-06-13 09:00', endTime: '2024-06-13 18:00', username: 'Jane Doe', phone: '123-456-7891', imageUrl: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIALAAuwMBIgACEQEDEQH/xAAcAAAABwEBAAAAAAAAAAAAAAAAAgMEBQYHAQj/xABSEAABAgQBBQoKBQkGBQUAAAACAQMABAUREgYTITEyIkFCUVJhgZGhsQcUU2JxcoKSwdEjMzRDcxUWJGODorLC4URGVJPS8DVFVXTiFyV1hMP/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX/xAAoEQACAgEDBAICAgMAAAAAAAAAAQIDEQQSMRMhQVEFFBVhIjJCcZH/2gAMAwEAAhEDEQA/ANwgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgQIEAAgR2BAByBHYEAHIEdgQAcgQzn6lKSAYpp8Q0Xw2VVtx2TTbn1RBv5bSIJialptwOVYR7FJF7ITaXI1Fy4LRAijTOX5B9VTm/20wQ9zZQxd8IkzwRkW/fc/0xHVj7NFRY/Bo8CMsd8INQLYqNNH1ZI173IbOZa1V7Yr4NfhyQfzKsLrQK+tZ6NcgRjh5UVU/wC9syPqysun8kJrWaq7/e+oeyDKdwQuvAf1rDZ4EYsszU3f721f2XQTuSEHhmfvcrcoB4/04k3+JEvD60ROiS5NvjsYYLD57r848pHB/wDkzTvtHVbL/rmUHtVU/gqwnfFAqJPg3KBGGIro/wDPK77NWehRufmg2K5W/anzLvhdeBX1LfRt8cjGgrtSa2K1U/2hoXekH/OqvhsVqZ9qXaXvGH14Celt9GxR2MgDLSvtbdTzn4ks2nciR3/1Lqbe4eT6RNrCwip3xcbIy4Jlp5x5NfgQTFHcUWYhoEcvHYABEPVqr4ufikkguThDfdbDKLqIvgmteZLqnarUjAylJIh8ZwpjctcWEXUq8arvJ0roiIERZDCGLdEqmRFcjJdaqu+q/JNSQ0sgMXmhaxFmimXy0m84KKRr8E5k0JETMpM+Q/ciedOGplBIEytPhM+QL3Yi3Zsg4Je7FjrcxmpbN8JzuTXEJLNlMPZsPe4kSM2aLuR7k1yx/dhsSZ3dAwJewnyixrTHfKt4eDuV+eiHEqx4uzmsWLdKpbm2vmgSE5FIebH/AAzfuRGTEyIGQgJCX6t0x7lSNJfIQAiPDhHSXoSKbJg1N1JrG0JZx5VLcpqFL/GDCDc/ZBlUJwNyD74iWj60l7VVYkKHUZ7dY384w2NgEgDaXnRLrovfTp0Xh7lgktLyzTDTTYvzB7Q7wpZVXuTpWGtOYzTIt8LheldK9SaOiM7EksI69InOe6XCJMXn5t5ps3y3RWHp7k5kSJIKTy5pz3f6/CGNNQTnGC85euy2+CRYouFcMd+Tnt1FkpN5ISo0wZeWz4E4WHaxEupdGjrhnJsi7mBd3Q47EPWO/wClOqLHNBjlnR5QL3aIr0tsFg2sS4elEXviLkkl28mulk5twb5RNjSZPyRe98oWGmSfkv3y+cOWSF0BdDZIUXrS8LCMdSSZwtvJGVClMHJu5prCQjcd0qottKoqLdFvEKyGJoFzqDotZbrFyEYp1RlHZaeeaBvEKFcV5l0onbEWwTNqLum3k3nFHUKG6HEbXK9LUQGimBccdcvmmW7Yjta66VRERLp1wEE5iiKq1TJo0kZEhKdcDGpLpRkFW2NU4104R31Rd5FVKi94TWDN+UlKZNlU8SMy7JYVFx1dQqqLotrXiRFvaJemSRSMt+kO5+ceLOTUx5Q1TTbiRNQpvIic8NIBUGxl2cIYi3VyIiuRkutVXfVf96IRcODvFDclh5FgTMoQNYUJIbTrni8s65yRv073baJyUVuszOdnC5I7gejX23hagjjzrvoAe9fhEM6UWGhtYKaJeUJT7bJ2IkQu7LYeozYyjJOn6BHjWKrN1WZd+9IfNErJ2RIZWH9MwPBwKvbp7k64rpgWDgj6xIkVkgO/VZnMkxnyJohsWLT1KumD5KpnZ8i8m0vWqonziLmm3QDFhxDyh0p2QnLVFJSQnmGPtc5gaZ12RFuhKqpqsi3gBCr8z+Vqw/O7TArm5fiUBXX0rfovEtLN7RGWzo9KrZV+HWsR1Ol2peWxfdNimH0Imjp3/SqxKgO4Efe9K6V7VWOf+0z0Zro6ZQfMu4Zh7xd7EA4i87VxouiHYViZx7sWiH1VT4wzQYMLcbJ4POJ+TnWphki2c3pMS02Tj50iDl9xi6O26fKDtNlCgtYMXs9l/nGV7zDB1aPtdEfy1WYl2RbMXCwjbcim9oTWvFaHAVyT5L/uj84hlZxn1dyR0ZYuTGldn8UzC2rE2ifbrsj+t9xPgsS7aMm2JCAmJJdCTTdIpoyvmw7ZJ5ttBF0hRN5CtGisIVaz3NXVzBuvejK/CXUGKhW6eMjUZbNMsmjrmO6At0W2jWq83Et7RFuplXlTujGZJgtnFZprmVL2Rei6w8k8hWg3VWqYjym5YcS+8qWTqWM3al5O6OjWP5PuRFJfKXmZmqS9Rp7c4TpZkXMYkgrtFchVUVVVVtZOlLWkiyjym2pecKbHhZkAdRNFr6RFefR1RYZWTodM+xU9onfLP7su3QnQiQu9V3T4RRzy1kY8dy1od3BW2cvahLnm6hTHy84Zcm1VF4rKqKvpQYkZnLVhoPqMLun6N53Nqvq6FxdEODnXT4UIOO4//Ky/BIz+9+i/xz9kVM5ePgY4JNjCQ7WJ0u0QtbnhjUstTeZzBNSwiSpjIjMFTTqTEFlS9t+J4haPbab91IRKVlvINe4kH3V6D8bLxIp8zlEwJ7rm3OJN/iVdC9cTkjlnKEy1LNPyzGEEAcSqRKqJbUi2vD06XIntybXuJCRUenHtyrfuw/uw9C/G2exOdmWp4P0ueEhHTtAKJ2aIjnJSRd3QTOL1XRW8P3KFTjxfQbW1hM0Tn0IsE/N+nO7kJNssPC3ulV74a1cH4Yn8bZ7RX35V9p79HxF5zfySGlOY8YmX5sxHCN2Q4lXhqnpvbisq8UWg6RQWdwVPlni/Vho95fgiwk4DAA03LyzUs0JLgbbG2u6610r/AFWG9TFrCKr+Ns3ZnwQ1amhlWWmNziK7i8VhsveqL6EWI2o5TOlMZuUdFtpsUTZviWyXW6890izzRStMenJ02m3pkZcWmhKy4SVVUysvMoJfnii0/J+eqEsj0tg2rKJFZUjenGzJhr3OWoa/4PmMpKmZ4QdYL1g/rF9pjD7oYZsW87gFz6O9lFb2VL86KnRGfhkdU/Kyw+2XwSLvk+5U6fLCM2/LPE20jIYQJUQUVV0qqpdVVeLe54pzrXk51pr3xFk8zJFHKhKlLsiXK+EN/wAqT3AfIfVAE+Cr2wg8/MzBiTsy65h2RI7pqte0c9ttbi0dun0l6sUnHGPY9kWMYER4cIlwocXkw25lr2SRe6IdBLaPdesKc8KC2RxnDUxjBJm9vx9k7HLclkkSn6cHCcc9VovjaEPyrL8CVnFHe3I/6oQRgoMMoRIi3tB9z9Cj8ZHzMfvVh13bdxQgU5j4UU5Jp3lFHUnX+VGL08meqq4LgtvjA8qO54YqaT7sGSpOxL00ilGJas9HM/FZSqOwdKqXJifryHiJYs9HM7EAlW80oOFUx8rCO0UHQmJpE3nY6ike6DZHaItCJ0xFjPtYPKFydQp6V315kjhvOzH1peqO8noSF08ci2tj9yaaDY+nLztAp0a17IavPuu7ZbngjqRPQiaIIARIM0eed2JN32hwp1rZIrb6QNwh3bI1RhaXVhoHCdaJx8UTMjvXvpuu9o7oeP0qZlwxTDBCPQvXa9oKxLiewQ7nSRYtCc6rqRIO68DdkJR7MjGZTAZEe6dIrkXPfeh0LHmw4KcpUv8AWzzeLCm5bEi3uNEt2wi5lBTGvqmJl/3RTruq9kPbZIzVi8IOErC4SZHwYjXcqi/s8jLN+c4ROL2KMILlNWHfs7ot+azLj3qir2w+hN8g7JeCeKlvmG4acLdDiFsrKo3TFZeO14RplMzpk+cyO0gA2WLdoq2TTZExXslt++iK9MTtXmPtE3NkPJcdUR6lVEhJh6ZamW5vxwRfZNDBwnc4qKi3TVeNow2x2mFlTnLc33La4dMlPtFQYHDowiSuLr06BRV13TohAso6LL/VMTcz52FBHtW/ZFXmTGYPPzD+J1wiNSEFXGqkqqum1tKrCK5j9aXuj8FgVEEWoya7lmLLJr7qjt/tHlXuSElyyfVbpSpS3Opr8YrquNcBgfaMl7lSOZ/9U17t+9Y0UI+ES4RLAuRta4DA/wCaCr+6pQk7knWmv7C+XqsuL2oMXv8AJ7QGRA+2OK25KQMdSImsTvvRE1HJ0nXhKUnKeOEbfTDNNr0KLiW1rvLHRhHkx+Qv/wBlNdotTa+tkXx9YFTvtDRxh1rbER9pPnF6maXWCBjNVFj6MMH6NWJiXvZVVNd7rp1rdeeCmxlYyy0LLs26QmSlgrjRrZUTfNvTqXRvX1rfQsI1XyNnlFEsXJKLHk1kuVWZ8Zm8QsY8ACJWU131Vd5E5ta30pbTc6NKTkvTZmZrxHMlhxjLv5l1QREVV0g2l1W+rTqTjVIdyqsNU1hhoh2ru4Qw2RUVdCWREuq30QkkTZrpzWEsDdrITJt37p/iLC8fXrWGc3kRQ8yXi5P7kr4c7dNS3sq6d7f/AKxYpWYlse4msQ4U4SdGhF19EIVGclpeTL6VoSLzrWRVvZVX0Jr41i8I4+rZn+xSaXkqX5VGUCZLNOCSiTwjiS2nRayL/vpuEpkbItfaCcfLzisnUll7YjcmnmDyhHNPtOCMuRkQndLqqoqX31SyauNOOLksyx5dv30iVTBvLNJay/G3cxCWpknKfZ2m2/wxROu2uFsw0HBiIr+V1DoIF47UWM7huMu2SE4t9VhTSl+NbJzxmlV8Mc86ZDSaYwyPBKYJSLpRFRE61jXalwjmc5N5bybAbYnucI+7FEy9yeaOWKoShODmRu6yJblUTfRFWyKmldG9FDTwr5TY/wCwkPJzJW7CvF2yYywaypk323WhYnGR+lZxXExXRdL6bbyouq6a7xnOPY2otdc0yhIbXknC9Y04uZI6jo8Bhr2rr3rC0zTXwn5mWl2HX826qDmwIltrTUi7ypDqXyarUxsUx8fxhRr+NUjNRPdjbDGWxh4w7wMI+qAp3JBSedPbdcL1iWLIxkFXD+tGWY/Edv8AwoqQ7byCwfa61KN+a2Oc71FeyHtE9VUv8imWgRocvkJTPvZmpP8A4LOFO0V74fsZH0MP+WPufjTWHsQ07oNpjLX1L9mXlsD6vxWOBuzwhui5I6VjaJXJ6iyks66FKk8TekScHOWvp1rvJ8I6D+Dcy7u55MrL6E6lJOyHtwYv5KPhGSM0SqzH1VMnS87MkidapaHKZKV9UulOK3O62n88aa847yZkvxHRb7NysNVTTstdMwar3rD2oxfyM/CHZZR0UGc47ONttDtE404iJzqqpZII1lJk3MbkK1Sy/wDtgK9SpFEyyZk5SjkX0gi4NjZ8aaeIw0KpIoLZE3rKiaVS19NqOv5nnsP11v1pdpz/APRO6NMJnnJs34Dp0x9U/LOeq8Bd1oBSEsf/AIgK/wA0YO/TsnHWZYvy6+I4FRrxiRLVjJVTcKttKr1wcabLAEsUrlNItjgVGitMNY0QyVdKtol0VV3+KIcEXuaNvOmNBsfw/K8IOMutBuHW/aBV7xinUeqPyOTbTh1Px8hNQBxk7jhvbSpDfRp3uJPQ48crjrJEYt7nlGnwSOeycYcnRXVOzuiTnZsvvSEvWG3whemSsjNhnXRb2rDhZBepV/3oint1aZns7jzbeb2tzdNdtd0403om6NOPnIDgmW9pfulX+aLz5MpRw8FublpMN1hd/eT+FIRWpU4J8aftO4sGIjUhRUTFbSqLqtvb8RSOO8OZL2RRO+8V3LSZaplHfmZT/iE0Qy4PYAxrfXdURFXcoqaebmgUm3hCwku5S8oZn84Mp6hNyTTeYI7Z7BucAogoqIujSg3579MRD8pJhuTnN15oJZOm6d0WxaBMuvSOTdHESmXAvNObyKulVVeJNKatSLrvEs3kLkkZv01qpzs3UGWkN6Yl8Ktt6VFboiKq2VFul7203SOpdkYPky2YaOXPaEhLUQ6l4+nm1xOZCzhSmU8jg2XiVhedDRUROvCvRDOuUt+iTkzS5vCRDY2nB2TRdRDzKl+pU3oRoBYKxT/+7ZX99IUuCkei5J8jpvvYREdWkkSyadOqAmLhtTZfjTCD1oij3Q3l2RCjsOeMujixITY4LbV7pdL6kXf34ImY/WF+1VO60YGo6wjtGxJD5xEri9qL3wQp4Q3PjzY+ay1b4/CGyuywfcNesQoq9awVagOyGEYeSWhwr4mezOv+toTrwp3woCFwJH/OeVe9V7ojyqPnRz8oetBuEkWJUfCm4voG85bZuqJv6kROKIt7On9bPOfsxT44oQnay0YNMS5ZzN3xYSvpXQmhOZE64ZY5536qTmS9ZohTrVETththgdONMcMnS9Z1U7EskN8En/h21510wiUnVXf7Lm/xHQ+CqvZBFpVT5UsnpdL/AEwITKS7ktXAZIZtgpZ0hLCTJ5xEsiWuo6U0qvVovEAFSyhlAGWOTZIW9AjMUphxdHGqtqq+lVgrPhAyqlzwtV2acHQiYkRb+hFi4fnDl20n/E6dMj+uaS/TcfjGpJWmqlMzDP6Rk3TSdx/9MIbiqa0zajpRU7U4okabSpmrGLctkewTmPatNMNgi61UjcVETRp39KW1RMvZVZUNMiRyNEnS3xbawqnStrwg5l5U5donJ3JWXwjtEzMGnYirEvI0TRZJViRBpunsMCw2O5bEiUVVbqW0qrZVVda6l3oaTNHrQBhmJOZw4dluYsnaJL2xFB4U6fwqPNt/hzq/FIVTwm0o/uqq1+0AvhGMq23lrJtCe3h4Gc1KVGXAm5enONiW0RFiNU4lVLJa+myImpNdoNQZmcaPNOsOYRLawrCjvhDpxBuCm/2gJ8IfZP8AhAyelAEJvObSqWJpYeH6E335Jbxr1oqWVNQGYykpkse6al0V8xxaFXSqdKIPbFmnvCbk4eIZdov8lV+EZhVKmNQyhnqg0OEXBLAOqyIKImje0J2xVcHuJk/BrvgsNg5OZq1TdEX6rNrKtEXDRExYUXzkwp6UXfVIsqutS7xDTKcwxLD9HibARvZbak0qiL8Yqfg8QXcnsnHNzhl/GnC40cQkALdF4tkkZOnJygDucVzLo06ehY6FwYNmV+FGRaCTk3wxYpWYOULFa+FUQwS6byIqonp6VolHX/3iR/7pv+NI1rwyYToLAhwps3B9Aog/OM6p9GmZeqyLuFCYGYaMnMY6EQkVVVL3S2njhMqJrgnPTEsxLSkq64Ld91qS6rxrZIWbotad2xabH9Y6n8uKOU+u0qngWdnGy80dK9kcmfCFR2vqmJl/sTqVbRzKLNWPByYmT3UxUWh9hSTrVRhVvJyV4c4+5+GI91i74rEz4TsH2SmNCXKcP5a4hJ3wk1x36p1hj8NpFXrW8WoCyaY3QKYH3D7nrOknYiikOEkZGX3QSMs3h4RCl06VT4xiM3lhXJj62qzP7M82nUNoh36i66eKYdccLlOGpd8PYG432ZyipUpuXarJNlyRNFXqRYiJnLihhsTj75fq2fmiRiazkE8fikic5Nafy8k/upN8vxHcPYl4brlnNkt2pIEDe+l/pGXDUPOhZKphS2ctbeh4QmRlGFsJkZh7ZbW4jxkmrq1xZVrnnRUEB2O4X/OhgWxa150FWtedFWRt+DI07ABYXKm079aLZesKL3pCBPyP+DY/yh+UQ6A7HbFABKZ2R/wbHuJCizrWDDmGsPJwJEPuoKqlAA4qStHmiaabb1oWEUTitq6YatLuxjiqUctACNGyBrLrWTk3JtNm9NybqvtMBtOCqJdE49KLz3VE03tF5o+UkzNyDv5Jk85PE0WIcNs2qXRUJVthsqWW9rWjDKbPv0+cam5R0m3R6lRdaKm+i8UXKYy9qLsh4sD7bYlt5kSRTXpXQujWt154CWu5M+E6fk/E5Ony5Yt1fauuFFVVVfSSkupNFt60UhagUMn3ymHs46WJ0uziSOttOu7AlANDlZ0uVBFmCPhQ9k8n5yY4JRZKfkO6e3AMptyPlRxWXT4JRqMrkQwG3EmxkpItcEYeAMaWTfPglASmTh7DRe7G3DRJENhgfdhYKfLB9037sGAMMSg1E9hhz3YMmSNYd2WD92N28XaDgj7sFVPNgwIxVjICtO7YCPrQ8TwbVK2mZZv6I1q2OD5uDAGYfmwXJjn5tFyY0sGGPJQ5aZY8gMGBmWJkw7yYOmSzvko1gGWuA0PuwqLAn91+7BgDIlyVd8kUELJV/wAkXuxswyw8kYNmWvJQAYieSU5wGC92EVyNqJ/cF7sbugtcmOqo8kYAMF/MaqnsSxe7Bx8HlaP+zFG7Yhg2IYAMPb8GdcP7pofWNPhD6X8FNTP62eYY9UVVfhGwEsJqsAGeSXgpk2vtFRdc9UET5xYJHI2iyP3Djn4h/KLApQmRQAJMyknL7lqWbH2YVUuRCRRxIaEGI4KkBG4VRuABO0dwQujMGzcDAbZvHCiMDghwDEK5kYQEYrMdzfmw/NuCYYaA/9k=' },

]

const CheckUseBefore = () => {
    const navigate = useNavigate();
     // const user_id = useSelector((state) => state.Login.id);
    const [useBeforeDTO  ,setUseBeforeDTO] =useState([])
    const [service, setService] = useState(0);
    const {user_id}=useParams()

    useEffect(() => {
        axios.get(`https://dongwoossltest.shop/api/Booking/before/${user_id}`)
            .then(response=>{
                setUseBeforeDTO(response.data)})
            .catch(error=>console.log(error))
    }, [user_id]);

    console.log(useBeforeDTO)
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className={styles.checkMyCarContainer}>
            <ComponentHeader text={"예약 리스트 "} style={{marginTop: "3%"}}/>
                    <div className={styles.carouselContainer}>
                        {useBeforeDTO.length === 1 ? (
                            <CheckUseBeforeCard key={useBeforeDTO[0].carId} car={useBeforeDTO[0]}/>
                        ) : (
                            <Slider {...settings}>
                                {useBeforeDTO.map(car => (
                                    <CheckUseBeforeCard key={car.carId} car={car}/>
                                ))}
                            </Slider>
                        )}
                    </div>


        </div>
    );
};

export default CheckUseBefore;

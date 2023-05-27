import image404 from '../../assests/image/404.webp'
export const Error404 = () => {
  return(
      <div style={{width:'100%',minHeight:'80vh', display:'flex', alignItems:'center', justifyContent:'center'}}>
          <img style={{maxWidth:'90vw', maxHeight:'80vh'}} alt={'404'} src={image404}/>
      </div>
  )
}
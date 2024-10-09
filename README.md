export async  function PUT(req){
  const {where} = await req.json()
  const redisdata = await client.get(`Ecommerfooter${where}`);
  if(!redisdata){
   
      const data = await prisma.ecommers_footer.findMany({
        where : {
          id : 1
        }
      })

       let path = {
        deleted_by : 0
       }

       if(where == "Navbar") path.explore = 1
      if(data != null) {
            const executeApi = await prisma.ecommers_navbar.findMany({
              where : path,
              orderBy : {
                nav_link : 'asc'
              },
              select : {
                name : true,
                 nav_link : true, 
                 explore  :true
              }
            })
      
      
            if(executeApi.length > 0){

           data[0]["links"] = [...executeApi];
            }
  
        
       
      const value =  await JSON.stringify(data)
      await client.set(`Ecommerfooter${where}`, value,{
        EX: process.env.REDIS_EXP,   
        NX: true
      });


    
        return NextResponse.json({data},{success : true}, {status : 200})
      }
      else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
  }else{ 
   const value = await JSON.parse(redisdata)
   return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}






























export async  function GET(req){
    const redisdata = await client.get("footer");
    if(!redisdata){
        const query =  `Select * from jtc_footer LIMIT 1`
        const data = await executeQuery(query);
        if(data.length > 0) {
          for (let index = 0; index < data.length; index++) {
            const query =  `Select name, nav_link, explore from jtc_website_links WHERE deleted_by = '0' && name Not Like 'JOIN%'  && name Not Like 'Hire%' && name != "Courses"  ORDER by nav_link ASC`
              const executeApi = await executeQuery(query)
              if(executeApi.length > 0){

             data[index]["links"] = executeApi;
              }
    
            }
         
        const value =  await JSON.stringify(data)
        await client.set("footer", value);
          return NextResponse.json({data},{success : true}, {status : 200})
        }
        else return NextResponse.json({message : "Data Empty"},{success : false}, {status : 206})
    }else{ 
     const value = await JSON.parse(redisdata)
     return NextResponse.json({data : value}, { success : true}, {status : 200})
}
}
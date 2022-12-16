//모집게시글 가져오기 api (전부)
async function getJoins() {
    const response = await fetch(`http://127.0.0.1:8000/articles/festival/join/`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
        },
        method: "GET",
      }
    );
    response_json = await response.json();
    return response_json;
}


//모집게시글 생성 api
async function postJoin(festival_article_id) {
  article = await getFestivalDetail(festival_article_id);


  //프론트엔드에서 태그 id 확인하기
  // const title = document.getElementById("festival_title").innerText;
  let searchForm = $("#searchForm");
  const join_count = searchForm.find("option:selected").val();
  const join_title = document.getElementById("join_title").value;
  const join_content = document.getElementById("join_content").value;
  const join_donedate = document.getElementById("join_donedate").value;

  const data = {
      join_title: join_title,
      join_count: join_count,
      join_desc: join_content,
      join_period: join_donedate,
  }


  const response = await fetch(`http://127.0.0.1:8000/articles/festival/${festival_article_id}/createjoin/`, {

      headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: JSON.stringify(data),
  });

  if (response.status == 200) {
      alert("게시물 등록");
      window.location.replace("http://127.0.0.1:5500/templates/festival_page.html");
  } else {
      alert(response.status)
  }
}


//특정 모집게시글 back에서 받아오는 api
async function getJoinDetail(join_article_id) {
  const response = await fetch(`http://127.0.0.1:8000/articles/festival/join/${join_article_id}/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "GET",
    }
  );
  response_json = await response.json();
  return response_json;
}


//모집게시글 삭제 api
async function deleteJoin(join_article_id) {
  const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "DELETE",
    }
  );

  if (response.status == 204) {
    alert("게시물이 삭제되었습니다.");
    window.location.replace(`${frontend_base_url}/templates/join_page.html`);
  } else {
    alert("게시물 작성자만 삭제 가능합니다.");
  }
}


//모집게시글 수정 api
async function patchJoin(join_article_id, join_title, join_desc, join_count, join_period) {
  const JoinData = {
    join_title: join_title,
    join_desc: join_desc,
    join_count: join_count,
    join_period: join_period,
  };
  const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/`, {
      headers: {
        "content-type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "PATCH",
      body: JSON.stringify(JoinData),
    }
  );

  if (response.status == 200) {
    response_json = await response.json();
    alert("게시물이 수정되었습니다.");
    window.location.reload(
      `${frontend_base_url}/templates/join_detail.html?join_article_id=${join_article_id}`
    );
  } else {
    alert(response.status);
  }
}


//신청게시글 생성 api
async function postRecruit(join_article_id) {
  const payload = localStorage.getItem("payload");
  const parsed_payload = await JSON.parse(payload);

  //테스트할 때 포트번호 변경
  const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/recruit/`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
    }
  );

  if (response.status == 201) {
    alert("해당 모집글에 신청되었습니다.");
  } else {
    alert("이미 해당 모집글에 신청되었습니다.");
  }
}


// 댓글 백엔드로 전송 //
async function postJoinComment(join_article_id, myNote) {
  const commentData = {
      comment_content: myNote,
  };
  const response = await fetch(
  `${backend_base_url}/articles/festival/join/${join_article_id}/comment/`,
  {
      headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("access"),
      },
      method: "POST",
      body: JSON.stringify(commentData),
  }
  );

  if (response.status == 200) {
  return response;
  } else {
  alert("댓글을 입력하세요");
  }
}


// 수정한 댓글 작성 버튼 클릭 시 동작하는 함수
async function putJoinComment(id) {    
  const comment_retext = document.getElementById(`join_input_comment_${id}`).value;
  const commentReData = {
      comment_content: comment_retext,
  }   
  const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/comment/${id}/`, {
          headers: {
              "content-type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("access"),
          },    
          method: "PUT",
          body: JSON.stringify(commentReData),
      });
  
      if (response.status == 200) {
          alert("댓글이 수정되었습니다.")
          window.location.reload(
              `${frontend_base_url}/templates/join_detail.html?id=${join_article_id}`
          );
      } else {
          alert("권한이 없습니다.");
      }
}


//댓글 삭제 기능
async function deleteJoinComment(id) {
  const response = await fetch(`${backend_base_url}/articles/festival/join/${join_article_id}/comment/${id}/`, {
      headers: {
          Authorization: "Bearer " + localStorage.getItem("access"),
      },    
      method: "DELETE",
  });

  if (response.status == 204) {
      alert("댓글이 삭제되었습니다.")
      window.location.reload(
          `${frontend_base_url}/templates/join_detail.html?id=${join_article_id}`
      );
  } else {
      alert("댓글 작성자만 삭제 가능합니다.");
  }
}
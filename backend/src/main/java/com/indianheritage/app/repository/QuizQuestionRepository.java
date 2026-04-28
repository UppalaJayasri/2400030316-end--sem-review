package com.indianheritage.app.repository;

import com.indianheritage.app.entity.QuizQuestion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {

    List<QuizQuestion> findByQuizIdOrderByIdAsc(String quizId);

    long countByQuizId(String quizId);

    void deleteByQuizId(String quizId);
}

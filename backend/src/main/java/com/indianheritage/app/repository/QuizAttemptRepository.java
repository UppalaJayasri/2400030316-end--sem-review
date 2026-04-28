package com.indianheritage.app.repository;

import com.indianheritage.app.entity.QuizAttempt;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuizAttemptRepository extends JpaRepository<QuizAttempt, Long> {

    Optional<QuizAttempt> findByQuiz_IdAndUserId(String quizId, String userId);

    List<QuizAttempt> findByQuiz_IdOrderByScoreDescCompletedAtAsc(String quizId);

    boolean existsByQuiz_IdAndUserId(String quizId, String userId);
}
